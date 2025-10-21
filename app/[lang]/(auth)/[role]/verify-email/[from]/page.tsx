import VerifyEmail from '@/components/auth/verify-email/verify-email'
import { Metadata } from 'next';
import React from 'react'
interface ParamTypes {
    lang: string;
    role: string;
    from: string;
}

interface PropType {
    params: ParamTypes;
}

export const metadata: Metadata = {
    title: "Verify Email",
    description: "",
};


async function page({ params }: PropType) {
    const { lang, role, from } = await params
    return (
        <VerifyEmail lang={lang} role={role} from={from} />
    )
}

export default page