"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { useTheme } from '@/providers/theme-provider';
import { EyeHiddenIcon, EyeIcon, FBIcon, GmailIcon, MailIcon, PasswordIcon } from '@/components/constants/Icons';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/lib/api/user/auth';
import { toast } from 'sonner';
import Cookies from "js-cookie";
import { useProfileStore } from '@/stores/profile';
import Spinner from '@/components/constants/Spinner';
import { useBookingStore } from '@/stores/booking';


interface PropType {
  lang: string;
  role: string
}
function Login({ lang, role }: PropType) {
  const { theme, toggleTheme, logo } = useTheme();
  const router = useRouter()
  const [passwordType, setPasswordType] = useState("password")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const setAuth = useAuthStore((state) => state.setAuth);
  const setProfile = useProfileStore((state) => state.setProfile);
  const {
    redirectToSession
  } = useBookingStore();
  const mutation = useMutation({
    mutationFn: () => loginApi(lang, email, password),
    onSuccess: ({ data }) => {
      // assuming response = { token, user }
      setAuth(data?.user?.id, "", data?.user, data.token);
      setProfile(data?.user);

      Cookies.set("token", data.token, {
        sameSite: "strict",
        secure: true,
        path: "/",
      });
      Cookies.set("role", data?.user?.role, {
        sameSite: "strict",
        secure: true,
        path: "/",
      });

      // ✅ Save coordinates if available
      const coords = data?.user?.location?.coordinates;
      if (coords && coords.length === 2) {
        Cookies.set("longitude", String(coords[0]), {
          sameSite: "strict",
          secure: true,
          path: "/",
        });
        Cookies.set("latitude", String(coords[1]), {
          sameSite: "strict",
          secure: true,
          path: "/",
        });
      }

      toast.success("Login successful!");
      if (redirectToSession)
        router.push(`/${lang}/home/salon/${redirectToSession}`);
      else {
        router.push(`/${lang}/home`);
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Invalid credentials");
    },
  });




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

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    console.log(lang, 'langlang')
    // e.preventDefault();
    if (validate()) {
      mutation.mutate()
      // submit to backend or handle login logic
    }
  };

  return (
    <>
      <div className=''>
        <h4 className='font-urbanist font-bold lg:text-[48px] text-[24px] leading-[100%] mb-[15px]'>Login</h4>
        <p className='font-urbanist font-medium lg:text-[20px] text-base leading-[100%] tracking-[0px]'>Want to register as <span className='text-xarfi-orange'>Business?</span></p>
      </div>
      {/* Inputs */}
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

        <label className='px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl'>
          <div className='flex flex-1'>
            <PasswordIcon />
            <input
              type={passwordType}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='ml-[10px] flex-1 outline-none bg-transparent font-urbanist font-normal lg:text-[16px] text-sm leading-[14px] tracking-[0%]'
            />
          </div>
          <button type='button' className='opacity-60' onClick={() => {
            setPasswordType(prv => prv === 'text' ? 'password' : 'text')
          }}>
            {passwordType === 'text' ?
              <EyeIcon />
              :
              <EyeHiddenIcon />
            }
          </button>
        </label>
        {errors.password && <p className='text-red-500 text-sm px-2 -mt-2'>{errors.password}</p>}

        <div className='flex justify-end'>
          <Link className='text-xarfi-orange font-urbanist font-medium lg:text-[16px] text-xs' href={`/${lang}/${role}/enter-email`}>Forgot Password?</Link>
        </div>
      </div>

      {/* Submit */}
      <div className='flex flex-col gap-[15px]'>
        <button
          type='submit'
          className='text-white bg-xarfi-orange rounded-2xl w-full lg:py-[22.5px] py-[18px] font-urbanist font-semibold lg:text-[20px] text-base lg:leading-[100%] leading-[20px] flex justify-center'
          onClick={handleSubmit}
        >
          {mutation.isPending ?
            <Spinner className={'fill-[#FF8C26] text-gray-200 dark:text-gray-600 w-6 h-6'} />
            :
            `Login`
          }
        </button>
        <p className='text-center font-urbanist font-normal lg:text-base text-[14px] leading-[100%] tracking-[0px]'>
          Don’t have an Account? <Link className='text-xarfi-orange' href={`/${lang}/${role}/sign-up`}>Sign Up</Link>
        </p>
      </div>

      <div className='flex flex-col gap-[25px] pb-6'>
        <div className='flex gap-[15px] w-full items-center'>
          <div className='h-[1px] border border-[#121212] dark:border-white border-dashed flex-1'></div>
          <p className='font-urbanist font-normal lg:text-[16px] text-[14px] leading-[20px] tracking-[0px]'>Or login with</p>
          <div className='h-[1px] border border-[#121212] dark:border-white border-dashed flex-1'></div>
        </div>
        <div className='flex gap-[25.13px]'>
          <button className='bg-background-secondary flex-1/2 p-[17px] rounded-2xl flex justify-center items-center gap-[5.79px] font-urbanist font-semibold lg:text-base text-[14px] leading-[140%] tracking-[0px] align-middle'>
            <GmailIcon /> Google
          </button>
          {/* <button className='bg-background-secondary flex-1/2 p-[17px] rounded-2xl flex justify-center items-center gap-[5.79px]'>
            <FBIcon /> Facebook
          </button> */}
        </div>
      </div>
    </>
  )
}

export default Login