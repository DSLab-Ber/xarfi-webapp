import PrivacyAndPolicy from '@/components/user/privacy-and-policy/PrivacyAndPolicy'
import TermsAndConditions from '@/components/user/terms-and-conditions/TermsAndConditions'
import axios from 'axios';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import React from 'react'

interface Props {
  params: { lang: string };
}

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}
export default async function page({ params }: Props) {
  try {
    const { lang } = params; // ✅ no await
    const cookieStore = cookies(); // ✅ no await
    const token = (await cookieStore).get('token')?.value
    console.log("===>", lang,)

    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/setting/policy/privacy?lang=${lang}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    console.log("res =====>", res.data.data)
    let data = '';
    if (res) {
      data = res.data.data
    }
    return (
      <PrivacyAndPolicy data={data} />
    )
  } catch (err) {
    console.error("Page Error:", err);
    return <div>Something went wrong</div>;
  }
}
