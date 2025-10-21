import axios from "axios";

// lib/api/user/updateProfile.ts
export async function updateProfileApi(
  lang: string,
  payload: {
    name?: string;
    phoneNumber?: string;
    email?: string;
    gender?: string;
    image?: File | null;
    location?: {
      address?: string;
      lng?: string;
      lat?: string;
    };
  }
) {
  const formData = new FormData();

  if (payload.name) formData.append("name", payload.name);
  if (payload.phoneNumber) formData.append("phoneNumber", payload.phoneNumber);
  if (payload.email) formData.append("email", payload.email);
  if (payload.gender) formData.append("gender", payload.gender);
  if (payload.image) formData.append("image", payload.image);

  if (payload.location?.address)
    formData.append("location[address]", payload.location.address);
  if (payload.location?.lng)
    formData.append("location[lng]", String(payload.location.lng));
  if (payload.location?.lat)
    formData.append("location[lat]", String(payload.location.lat));
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/setting/profile?lang=${lang}`,
    formData,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // 👈 same as fetch credentials: "include"
    }
  );

  return res.data;
}


export async function deleteProfileApi(
  lang: string
) {

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/setting/profile?lang=${lang}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      withCredentials: true, // 👈 same as fetch credentials: "include"
    }
  );

  return res.data;
}


export async function changePasswordApi(
  lang: string,
  payload: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
) {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const formData = new FormData();
  formData.append("oldPassword", payload.oldPassword);
  formData.append("newPassword", payload.newPassword);
  formData.append("confirmPassword", payload.confirmPassword);

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password?lang=${lang}`,
    formData,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        // ❌ don’t manually set Content-Type, axios will handle it
      },
      withCredentials: true, // send cookies
    }
  );

  return res.data;
}

export async function getProfileApi(
  lang: string,
) {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];


  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/setting/profile?lang=${lang}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        // ❌ don’t manually set Content-Type, axios will handle it
      },
      withCredentials: true, // send cookies
    }
  );

  return res.data;
}


// export async function getTermsConditionApi(lang: string) {
//   // cookies() is sync
//   const cookieStore = cookies();
//   // @ts-ignore
//   const token = cookieStore?.get("token")?.value;

//   const res = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/setting/policy/terms?lang=${lang}`,
//     {
//       headers: {
//         Authorization: token ? `Bearer ${token}` : "",
//       },
//     }
//   );

//   return res.data;
// }

export async function contactApi(
  lang: string,
  payload: {
    fullName: string;
    email: string;
    message: string;
  }
) {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const formData = new FormData();
  formData.append("fullName", payload.fullName);
  formData.append("email", payload.email);
  formData.append("message", payload.message);

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/setting/contact-support?lang=${lang}`,
    formData,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      withCredentials: true,
    }
  );

  return res.data;
}

export async function changeLanguageApi(lang: string) {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/setting/change-language?lang=${lang}`,
    { language: lang }, // 👈 payload
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      withCredentials: true,
    }
  );

  return res.data;
}
export async function changeDarkModeApi(lang: string, isDarkMode: boolean) {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/setting/change-darkmode?isDarkMode=${isDarkMode}&lang=${lang}`,
    {}, // no body needed, just query params
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      withCredentials: true,
    }
  );
  console.log(res.data,'res.datares.data')
  return res.data;
}