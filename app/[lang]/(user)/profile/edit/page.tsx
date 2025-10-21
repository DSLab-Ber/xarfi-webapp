import ProfileEdit from '@/components/user/Profile/ProfileEdit'
import { Metadata } from 'next';
import React from 'react'
interface ParamTypes {
  lang: string;
}

interface PropType {
  params: ParamTypes;
}
export const metadata: Metadata = {
  title: "Profile Edit",
  description: "",
};

async function page({ params }: PropType) {
  const { lang } = await params
  return (
    <ProfileEdit lang={lang}  />
  )
}

export default page