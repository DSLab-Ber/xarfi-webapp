import TermsAndConditions from "@/components/user/terms-and-conditions/TermsAndConditions";
import axios from "axios";
import { cookies } from "next/headers";

interface Props {
  params: { lang: string };
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

export default async function Page({ params }: Props) {
  try {
    const { lang } = params; // ✅ no await
    const cookieStore = cookies(); // ✅ no await
    const token = (await cookieStore).get('token')?.value
    console.log("===>", lang,)

    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/setting/policy/terms?lang=${lang}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    console.log("res =====>", res.data.data)
    let data = '';
    if (res) {
      data = res.data.data
    }
    return <TermsAndConditions data={data} />;
  } catch (err) {
    console.error("Page Error:", err);
    return <div>Something went wrong</div>;
  }
}
