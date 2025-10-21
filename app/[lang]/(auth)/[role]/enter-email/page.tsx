import EnterEmail from '@/components/auth/enter-email/enter-email';
import ForgetPassword from '@/components/auth/forget-passowrd/forget-passowrd'
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
  title: "Forget Password",
  description: "",
};

async function page({ params }: PropType) {
  const { lang, role } = await params
  return (
    <EnterEmail lang={lang} role={role} />
  )
}

export default page