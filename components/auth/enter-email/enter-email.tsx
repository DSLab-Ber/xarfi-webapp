"use client"
import React, { useState } from 'react'
import { EyeHiddenIcon, EyeIcon, MailIcon, PasswordIcon } from '../../../components/constants/Icons'
import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '@/lib/api/user/auth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth'
import Spinner from '@/components/constants/Spinner'
interface PropType {
    lang?: string;
    role: string
}
function EnterEmail({ lang, role }: PropType) {
    const [email, setEmail] = useState('')
    const router = useRouter();
    const [errors, setErrors] = useState<any>({})
    const setAuth = useAuthStore((s) => s.setAuth);

    const validate = () => {
        const newErrors = { email: '', password: '' };
        let isValid = true;

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is not valid';
            isValid = false;
        }


        setErrors(newErrors);
        return isValid;
    };
    const mutation = useMutation({
        mutationFn: () => forgotPassword(email || "", lang),
        onSuccess: (data) => {
            toast.success(data.message)
            console.log(data, 'datadata')
            setAuth(data.data.userId, data.data.otpExpires, {
                id: data.data.userId,
                email: data.data.email,
                name: "",
                role: "",
                image: ''
            });
            router.push(`/${lang}/${role}/verify-email/forgot-password`);
            setEmail("")
        },
    })
    const handleSubmit = () => {
        if (validate()) {
            mutation.mutate()
        }
    }




    return (
        <>
            <div className=''>
                <h4 className='font-urbanist font-bold lg:text-[48px] text-[24px] leading-[100%] mb-[15px]'>Enter Your Email</h4>
            </div>

            <div className='flex gap-[15px] flex-col' onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
                <label className='px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl'>
                    <div className='flex flex-1'>
                        <span className='!text-[#FF8C26]'>
                            <MailIcon />
                        </span>
                        <input
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='ml-[10px] flex-1 outline-none bg-transparent font-urbanist font-normal lg:text-[16px] text-sm leading-[14px] tracking-[0%]'
                        />
                    </div>
                </label>
                {errors.email && <p className='text-red-500 text-sm px-2 -mt-2'>{errors.email}</p>}
            </div>

            <div className='flex flex-col gap-[15px]'>
                <button
                    type='submit'
                    className='text-white bg-xarfi-orange rounded-2xl w-full lg:py-[22.5px] py-[18px] font-urbanist font-semibold lg:text-[20px] text-base leading-[100%] flex justify-center'
                    onClick={handleSubmit}
                >
                    {mutation.isPending ?
                        <Spinner className={'fill-[#FF8C26] text-gray-200 dark:text-gray-600 w-6 h-6'} />
                        :
                        "Reset Password"
                    }
                </button>
            </div>
        </>
    )
}

export default EnterEmail
