"use client"
import React, { useEffect, useRef, useState } from 'react'
import { ClockIcon } from '../../../components/constants/Icons'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { resendForgotOtp, resendOtp, verifyForgotOtp, verifyOtp } from '@/lib/api/user/auth';
import { useAuthStore } from '@/stores/auth';
import { useProfileStore } from '@/stores/profile';
import Cookies from "js-cookie";
import Spinner from '@/components/constants/Spinner';
import { useBookingStore } from '@/stores/booking';

interface PropType {
    role: string;
    lang: string;
    from: string;
}

function VerifyEmail({ lang, role, from }: PropType) {
    const [code, setCode] = useState(["", "", "", ""]);
    const router = useRouter();
    const inputRefs = useRef<any>([]);
    const userId = useAuthStore((s) => s.userId);
    const user = useAuthStore((s) => s.user);
    const otpExpiresTime = useAuthStore((s) => s.otpExpiresTime);
    const clearAuth = useAuthStore((s) => s.clearAuth);
    const [secondsRemaining, setSecondsRemaining] = useState(0);
    const setAuth = useAuthStore((state) => state.setAuth);
    const setOtpExpiresTime = useAuthStore((state) => state.setOtpExpiresTime);
    const {
        redirectToSession
    } = useBookingStore();
    const setProfile = useProfileStore((state) => state.setProfile);

    const mutation = useMutation({
        mutationFn: (otp: string) => {
            if (from === 'forgot-password') {
                return verifyForgotOtp({ userId, otp, lang: lang })
            } else {
                return verifyOtp({ userId, otp, lang: lang })
            }
        },
        onSuccess: ({ data }) => {
            toast.success("Email verified successfully!");
            if (from === 'forgot-password') {
                router.push(`/${lang}/${role}/forget-passowrd`);
            } else {
                setAuth(data?.user?.id, "", data?.user, data.token);
                setProfile(data?.user)
                Cookies.set("token", data.token, { expires: 7, sameSite: "strict", secure: true, path: "/" });
                Cookies.set("role", data?.user?.role, { expires: 7, sameSite: "strict", secure: true, path: "/" });
                toast.success("Login successful!");
                if (redirectToSession)
                    router.push(`/${lang}/home/salon/${redirectToSession}`);
                else {
                    router.push(`/${lang}/home`);
                }
                clearAuth()
            }
        },
        onError: (err: any) => {
            toast.error(err.message || "Invalid OTP. Please try again.");
        },
    });

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < code.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: any) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        const enteredCode = code.join("");
        if (enteredCode.length < 4) {
            toast.error("Please enter the full 4-digit code.");
            return;
        }
        mutation.mutate(enteredCode);
    };

    useEffect(() => {
        if (!otpExpiresTime) return;

        const updateTime = () => {
            const now = Date.now();
            const expires = new Date(otpExpiresTime).getTime();
            const diff = Math.max(0, Math.floor((expires - now) / 1000));
            setSecondsRemaining(diff);
        };

        updateTime(); // set immediately on mount
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, [otpExpiresTime]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const resendMutation = useMutation({
        mutationFn: () => {
            if (from === 'forgot-password') {
                return resendForgotOtp(user?.email || "", userId, lang)
            } else {
                return resendOtp(user?.email || "", userId, lang)
            }
        },
        onSuccess: (data) => {
            toast.success("OTP has been resent to your email.");
            console.log(data, 'datadata')
            setOtpExpiresTime(data.data.otpExpiresTime);
            // setTimeLeft(59); // reset timer
        },
        onError: (err: any) => {
            toast.error(err.message || "Failed to resend OTP");
        },
    });

    return (
        <>
            {/* Heading */}
            <div>
                <h4 className='font-urbanist font-bold lg:text-[48px] text-[24px] leading-[100%] mb-[15px]'>Verify Email</h4>
                <p className='font-urbanist font-medium lg:text-[18px] text-base leading-[24px] text-[#ACACAC]'>
                    Enter the 4-digit code that we have sent you on <span className='text-xarfi-orange'>{user?.email}</span>
                </p>
            </div>

            {/* Code Inputs */}
            <div className='flex flex-col gap-5' onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
                <div className='grid grid-cols-4 justify-center gap-[16.93px]'>
                    {code.map((digit, i) => (
                        <input
                            key={i}
                            type='text'
                            inputMode='numeric'
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            ref={(el) => { inputRefs.current[i] = el; }}
                            className='text-center font-urbanist font-bold lg:text-[36px] text-[24px] leading-[20px] tracking-[0px] bg-background-secondary rounded-md lg:py-[30.67px] lg:px-[34.65px] py-[16.36px] px-[22.26px] appearance-none outline-none'
                        />
                    ))}
                </div>

                {/* Timer and Resend */}
                <div className='flex justify-center flex-col gap-5 items-center w-full'>
                    <div className='flex gap-[5px] bg-[#FF8C261A] px-[15.5px] py-[7.5px] rounded-full border border-[#FF8C26] font-urbanist font-normal lg:text-[18px] text-sm'>
                        <span className='text-[#FF8C26]'><ClockIcon /></span> {formatTime(secondsRemaining)}
                    </div>
                    <button
                        disabled={resendMutation.isPending}
                        onClick={() => resendMutation.mutate()}
                        className={`font-urbanist font-semibold lg:text-[16px] text-base underline text-xarfi-orange`}
                    >
                        {resendMutation.isPending ? <Spinner className={'fill-[#FF8C26] text-gray-200 dark:text-gray-600 w-6 h-6'} /> : "Resend Code"}
                    </button>
                </div>
            </div>

            {/* Submit */}
            <div className='flex flex-col gap-[15px]'>
                <button
                    type='button'
                    onClick={handleSubmit}
                    className='text-white bg-xarfi-orange rounded-2xl w-full py-[22.5px] font-urbanist font-semibold lg;text-[20px] text-[16px] leading-[100%] flex justify-center'
                >
                    {mutation.isPending ? "Verfiying" : 'Verify'}
                </button>
            </div>
        </>
    );
}

export default VerifyEmail;
