"use client"
import { RadioOption } from '@/components/constants/Form';
import { useAuthStore } from '@/stores/auth';
import { useMutation } from "@tanstack/react-query";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoIosCamera } from "react-icons/io";
import {
    EyeHiddenIcon,
    EyeIcon,
    GmailIcon,
    LocPin,
    MailIcon,
    PasswordIcon,
    PhoneInputIcon,
    UserIcon,
    UserIcon2
} from '../../../components/constants/Icons';
import { registerUser } from '@/lib/api/user/auth';
import { toast } from 'sonner';
import Spinner from '@/components/constants/Spinner';

interface PropType {
    role: string;
    lang: string;
}
// ... your icons imports

function SignUp({ lang, role }: PropType) {
    const router = useRouter();
    const setAuth = useAuthStore((s) => s.setAuth);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: '',
        password: "",
        confirmPassword: "",
        gender: "",
        image: null as File | null,
    });
    const [preview, setPreview] = useState<string | null>(null);
    const [passwordType, setPasswordType] = useState("password");
    const [errors, setErrors] = useState<any>({});

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            // save token + user in Zustand store
            toast.success(data.message)
            console.log(data, 'datadata')
            setAuth(data?.data?.userId, data?.data?.otpExpiresTime, {
                id: data?.data?.userId,
                email: data?.data?.email,
                name: data?.data?.name,
                role: data?.data?.role,
                image: data?.data?.image
            });
            router.push(`/${lang}/${role}/verify-email/sign-up`);
        },
    });

    const handleChange = (field: keyof typeof form) => (e: any) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleGenderChange = (gender: string) => {
        setForm({ ...form, gender });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm({ ...form, image: file });
            setPreview(URL.createObjectURL(file));
        }
    };


    const validate = () => {
        if (!form.fullName.trim()) {
            toast.error("Full Name is required");
            return false;
        }
        if (!form.email.trim()) {
            toast.error("Email is required");
            return false;
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            toast.error("Invalid email");
            return false;
        }
        if (!form.phoneNumber.trim()) {
            toast.error("Phone number is required");
            return false;
        }
        if (!form.password.trim()) {
            toast.error("Password is required");
            return false;
        } else if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }
        if (!form.confirmPassword.trim()) {
            toast.error("Confirm your password");
            return false;
        } else if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }
        if (!form.gender) {
            toast.error("Please select your gender");
            return false;
        }

        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            if (!navigator.geolocation) {
                // Fallback if geolocation not supported
                mutation.mutate({
                    ...form,
                    lat: "0",
                    lng: "0",
                    // address: "abc street",
                    lang: lang
                });
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    mutation.mutate({
                        ...form,
                        lat: String(latitude),
                        lng: String(longitude),
                        // address: "abc street",
                        lang: lang
                    });
                },
                () => {
                    // Fallback if user denies or error occurs
                    mutation.mutate({
                        ...form,
                        lat: "0",
                        lng: "0",
                        // address: "abc street",
                        lang: lang
                    });
                }
            );
        }
    };


    return (
        <>
            <div>
                <h4 className='font-urbanist font-bold lg:text-[48px] text-[24px] leading-[100%] mb-[15px]'>Signup</h4>
            </div>
            <form onSubmit={handleSubmit} className='grid gap-[30px]'>
                <div className='flex gap-[15px] flex-col'>
                    {/* Profile Image Upload */}
                    <div className='flex justify-center'>
                        <label className='relative lg:w-[142px] w-[106px] aspect-square rounded-full flex justify-center items-center bg-background-secondary  cursor-pointer'>
                            <input className='hidden' type='file' accept="image/*" onChange={handleImageChange} />
                            {preview ? (
                                <img src={preview} alt="Profile Preview" className="w-full h-full object-cover rounded-full" />
                            ) : (
                                <div className='absolute'>
                                    <UserIcon2 />
                                </div>
                            )}
                            <span className='bg-xarfi-orange w-5 h-5 rounded-full absolute bottom-2.5 right-1.5 flex justify-center items-center'>
                                <IoIosCamera size={15} />
                            </span>
                        </label>
                    </div>

                    {/* Gender Selection */}
                    <div>
                        <p className='font-urbanist font-semibold text-[16px] leading-[100%] tracking-[0px] mb-2.5'>Select Gender</p>
                        <div className='flex gap-[46px]'>
                            <RadioOption textClassName={'max-lg:text-sm'} label={'Men'} selected={form.gender === 'man'} className="p-1" onClick={() => handleGenderChange('man')} icon={false} />
                            <RadioOption textClassName={'max-lg:text-sm'} label={'Women'} selected={form.gender === 'woman'} className="p-1" onClick={() => handleGenderChange('woman')} icon={false} />
                            <RadioOption textClassName={'max-lg:text-sm'} label={'Other'} selected={form.gender === 'other'} className="p-1" onClick={() => handleGenderChange('other')} icon={false} />
                        </div>
                        {errors.gender && <p className='text-red-500 text-sm px-2 -mt-2'>{errors.gender}</p>}
                    </div>

                    {/* Full Name */}
                    <label className='px-[15px] lg:py-[20.5px] py-4 bg-background-secondary flex items-center rounded-2xl'>
                        <div className='flex flex-1'>
                            <UserIcon className="w-5" />
                            <input
                                placeholder='Full Name'
                                value={form.fullName}
                                onChange={handleChange('fullName')}
                                className='ml-[10px] flex-1 outline-none bg-transparent font-urbanist font-normal lg:text-[16px] text-sm'
                            />
                        </div>
                    </label>
                    {errors.fullName && <p className='text-red-500 text-sm px-2 -mt-2'>{errors.fullName}</p>}

                    {/* Email */}
                    <label className='px-[15px] lg:py-[20.5px] py-4 bg-background-secondary flex items-center rounded-2xl'>
                        <div className='flex flex-1'>
                            <span className='!text-[#FF8C26]'>
                                <MailIcon />
                            </span>
                            <input
                                placeholder='Email'
                                value={form.email}
                                onChange={handleChange('email')}
                                className='ml-[10px] flex-1 outline-none bg-transparent font-urbanist font-normal lg:text-[16px] text-sm'
                            />
                        </div>
                    </label>
                    {errors.email && <p className='text-red-500 text-sm px-2 -mt-2'>{errors.email}</p>}

                    {/* Phone */}
                    <label className='px-[15px] lg:py-[20.5px] py-4 bg-background-secondary flex items-center rounded-2xl'>
                        <div className='flex flex-1'>
                            <PhoneInputIcon />
                            <input
                                placeholder='Phone Number'
                                value={form.phoneNumber}
                                type='tel'
                                onChange={handleChange('phoneNumber')}
                                className='ml-[10px] flex-1 outline-none bg-transparent font-urbanist font-normal lg:text-[16px] text-sm'
                            />
                        </div>
                    </label>
                    {errors.phoneNumber && <p className='text-red-500 text-sm px-2 -mt-2'>{errors.phoneNumber}</p>}

                    {/* Address */}
                    <label className='px-[15px] lg:py-[20.5px] py-4 bg-background-secondary flex items-center rounded-2xl'>
                        <div className='flex flex-1'>
                            <span className='text-xarfi-orange'>
                                <LocPin />
                            </span>
                            <input
                                placeholder='Address'
                                value={form.address}
                                onChange={handleChange('address')}
                                className='ml-[10px] flex-1 outline-none bg-transparent font-urbanist font-normal lg:text-[16px] text-sm'
                            />
                        </div>
                    </label>
                    {errors.phone && <p className='text-red-500 text-sm px-2 -mt-2'>{errors.phone}</p>}

                    {/* Password */}
                    <label className='px-[15px] lg:py-[20.5px] py-4 bg-background-secondary flex items-center rounded-2xl'>
                        <div className='flex flex-1'>
                            <PasswordIcon />
                            <input
                                type={passwordType}
                                placeholder='Password'
                                value={form.password}
                                onChange={handleChange('password')}
                                className='ml-[10px] flex-1 outline-none bg-transparent font-urbanist font-normal lg:text-[16px] text-sm'
                            />
                        </div>
                        <button type='button' className='opacity-60' onClick={() => setPasswordType(prv => prv === 'text' ? 'password' : 'text')}>
                            {passwordType === 'text' ? <EyeIcon /> : <EyeHiddenIcon />}
                        </button>
                    </label>
                    {errors.password && <p className='text-red-500 text-sm px-2 -mt-2'>{errors.password}</p>}

                    {/* Confirm Password */}
                    <label className='px-[15px] lg:py-[20.5px] py-4 bg-background-secondary flex items-center rounded-2xl'>
                        <div className='flex flex-1'>
                            <PasswordIcon />
                            <input
                                type={passwordType}
                                placeholder='Confirm Password'
                                value={form.confirmPassword}
                                onChange={handleChange('confirmPassword')}
                                className='ml-[10px] flex-1 outline-none bg-transparent font-urbanist font-normal lg:text-[16px] text-sm'
                            />
                        </div>
                        <button type='button' className='opacity-60' onClick={() => setPasswordType(prv => prv === 'text' ? 'password' : 'text')}>
                            {passwordType === 'text' ? <EyeIcon /> : <EyeHiddenIcon />}
                        </button>
                    </label>
                    {errors.confirmPassword && <p className='text-red-500 text-sm px-2 -mt-2'>{errors.confirmPassword}</p>}
                </div>

                {/* Submit */}
                <div className='flex flex-col gap-[15px]'>
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        className='text-white bg-xarfi-orange rounded-2xl w-full lg:py-[22.5px] py-[18px] font-urbanist font-semibold lg:text-[20px] text-base flex justify-center'
                    >
                        {mutation.isPending ?
                            <Spinner className={'fill-[#FF8C26] text-gray-200 dark:text-gray-600 w-6 h-6'} />
                            :
                            `Signup`
                        }
                    </button>
                    <p className='text-center font-urbanist font-semibold text-[14px] leading-[100%] tracking-[0px]'>
                        Already have an Account? <Link className='text-xarfi-orange' href={`/${lang}/${role}/login`}>Log In</Link>
                    </p>
                </div>
            </form>
            {/* Social Login */}
            <div className='flex flex-col gap-[25px] pb-6'>
                <div className='flex gap-[15px] w-full items-center'>
                    <div className='h-[1px] border border-white border-dashed flex-1'></div>
                    <p className='font-urbanist font-normal text-[16px] leading-[20px]'>Or login with</p>
                    <div className='h-[1px] border border-white border-dashed flex-1'></div>
                </div>
                <div className='flex gap-[25.13px]'>
                    <button className='bg-background-secondary flex-1/2 p-[17px] rounded-2xl flex justify-center items-center gap-[5.79px]'>
                        <GmailIcon /> Google
                    </button>
                    {/* <button className='bg-background-secondary flex-1/2 p-[17px] rounded-2xl flex justify-center items-center gap-[5.79px]'>
                        <FBIcon /> Facebook
                    </button> */}
                </div>
            </div>
        </>
    );
}

export default SignUp;
