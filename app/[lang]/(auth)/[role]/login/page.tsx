import Login from '@/components/auth/login/login';
import { Metadata } from 'next';

interface ParamTypes {
  lang: string;
  role: string;
}

interface PropType {
  params: ParamTypes;
}

export const metadata: Metadata = {
  title: "Login",
  description: "",
};

async function page({ params }: PropType) {
  const { lang, role } = await params
  return (
    <>
      <Login lang={lang} role={role}/>
    </>
  )
}

export default page