"use client";
import React, { useState } from "react";
import { EyeHiddenIcon, EyeIcon, PasswordIcon } from "../../../components/constants/Icons";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/api/user/auth";
import Spinner from "@/components/constants/Spinner";

interface PropType {
    lang?: string;
    role: string;
}

function ForgetPassword({ lang, role }: PropType) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const router = useRouter();

    const { userId, clearAuth } = useAuthStore(); // 👈 from Zustand

    const mutation = useMutation({
        mutationFn: (newPassword: string) => resetPassword(userId, newPassword),
        onSuccess: () => {
            toast.success("Password reset successfully! Please log in.");
            clearAuth()
            router.push(`/${lang}/${role}/login`);
        },
        onError: (err: any) => {
            toast.error(err.message || "Failed to reset password");
        },
    });

    const validate = () => {
        const newErrors: any = {};
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

        if (!confirmPassword) newErrors.confirmPassword = "Confirm your password";
        else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!userId) {
            toast.error("User ID is missing. Please start the reset process again.");
            return;
        }
        if (validate()) {
            mutation.mutate(password);
        }
    };

    return (
        <>
            <div className="">
                <h4 className="font-urbanist font-bold lg:text-[48px] text-[24px] leading-[100%] mb-[15px]">
                    Reset Password
                </h4>
            </div>

            <div className="flex gap-[15px] flex-col"  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
                {/* Password Field */}
                <label className="px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl relative">
                    <div className="flex flex-1">
                        <PasswordIcon />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="ml-[10px] flex-1 outline-none bg-transparent font-urbanist font-normal lg:text-[16px] text-sm"
                        />
                    </div>
                    <button type="button" className="opacity-60" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeIcon /> : <EyeHiddenIcon />}
                    </button>
                    {errors.password && (
                        <span className="text-red-500 text-sm absolute -bottom-5 left-2">{errors.password}</span>
                    )}
                </label>

                {/* Confirm Password Field */}
                <label className="px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl relative">
                    <div className="flex flex-1">
                        <PasswordIcon />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="ml-[10px] flex-1 outline-none bg-transparent font-urbanist font-normal lg:text-[16px] text-sm"
                        />
                    </div>
                    <button
                        type="button"
                        className="opacity-60"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <EyeIcon /> : <EyeHiddenIcon />}
                    </button>
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-sm absolute -bottom-5 left-2">{errors.confirmPassword}</span>
                    )}
                </label>
            </div>

            <div className="flex flex-col gap-[15px]">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={mutation.isPending}
                    className="text-white bg-xarfi-orange rounded-2xl w-full lg:py-[22.5px] py-[18px] font-urbanist font-semibold lg:text-[20px] text-base flex justify-center"
                >
                    {mutation.isPending ? <Spinner className={'fill-[#FF8C26] text-gray-200 dark:text-gray-600 w-6 h-6'}/> : "Reset Password"}
                </button>
            </div>
        </>
    );
}

export default ForgetPassword;
