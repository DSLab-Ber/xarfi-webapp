// app/[lang]/home/page.tsx
import ApiFallback from "@/components/constants/ApiFallback";
import Home from "@/components/user/home/home";
import axios from "axios";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "",
};

export default async function Page({ params, searchParams }: any) {
  const { lang } = params; // no await needed

  let categories = []; // ✅ only pass data
  try {
    const categoriesRes = await axios.get(
      `${process.env.API_URL}/api/user/categories?lang=${lang}`
    );
    //     const servicesRes = await axios.get(
    //   `${process.env.API_URL}/api/user/services?lang=${lang}&limit=5`
    // );
    if (categoriesRes) {
      categories = categoriesRes.data.data; // ✅ only pass data
    }
  } catch (err) {
    categories = []
  }

  // const services = servicesRes.data.data?.services; // ✅ only pass data


  return <Home categories={categories} />;
  // } catch (err) {
  //   console.error("Home page error:", err);

  //   return (
  //     <>
  //       <ApiFallback />
  //     </>
  //   )
  // }
}




