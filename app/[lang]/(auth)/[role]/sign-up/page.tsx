import SignUp from '@/components/auth/sign-up/sign-up'
import { Metadata } from 'next';
import React from 'react'
interface ParamTypes {
  lang: string;
  role: string;
}

interface PropType {
  params: ParamTypes;
}

export const metadata: Metadata = {
  title: "Sign Up",
  description: "",
};

async function page({ params }: PropType) {
  const { lang, role } = await params
  return (
    <SignUp lang={lang} role={role}/>
  )
}

export default page