import ProfileDetail from '@/components/user/Profile/ProfileDetail'
import { Metadata } from 'next';
import React from 'react'

interface ParamTypes {
  lang: string;
}

interface PropType {
  params: ParamTypes;
}


export const metadata: Metadata = {
  title: "Profile",
  description: "",
};


async function page({ params }: PropType) {
   const { lang } = await params
  return (
    <ProfileDetail lang={lang} />
  )
}

export default page