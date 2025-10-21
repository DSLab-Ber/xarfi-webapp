export async function registerUser(form: {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  gender: string;
  image: File | null;
  lat: string;
  lng: string;
  address: string;
  lang: string;
}) {
  const formData = new FormData();
  formData.append("name", form?.fullName);
  formData.append("email", form?.email);
  formData.append("phoneNumber", form?.phoneNumber);
  formData.append("password", form?.password);
  formData.append("confirmPassword", form?.confirmPassword);
  // formData.append("role", "user"); // fixed role
  formData.append("gender", form?.gender?.toLocaleLowerCase());
  formData.append("location[lat]", form?.lat);
  formData.append("location[lng]", form?.lng);
  formData.append("location[address]", form?.address);
  if (form?.image) {
    formData.append("image", form?.image);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register/user?lang=${form?.lang}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Registration failed");
  }

  return res.json(); // expected response: { token, user }
}

export async function verifyOtp({
  userId,
  otp,
  lang = "de",
}: {
  userId: string;
  otp: string;
  lang?: string;
}) {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("otp", otp);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp?lang=${lang}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "OTP verification failed");
  }

  return res.json();
}

export async function resendOtp(email: string, userId: string, lang: string = "de") {
  const formData = new FormData();
  formData.append("email", email);
  // formData.append("userId", userId);


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to resend OTP");
  }

  return res.json();
}

export async function forgotPassword(email: string, lang: string = "de") {
  const formData = new FormData();
  formData.append("email", email);
  // formData.append("userId", userId);


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password?lang=${lang}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to resend OTP");
  }

  return res.json();
}

export async function verifyForgotOtp({
  userId,
  otp,
  lang = "de",
}: {
  userId: string;
  otp: string;
  lang?: string;
}) {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("otp", otp);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password/verify-otp?lang=${lang}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "OTP verification failed");
  }

  return res.json();
}

export async function resendForgotOtp(email: string, userId: string, lang: string = "de") {
  const formData = new FormData();
  formData.append("email", email);
  // formData.append("userId", userId);


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to resend OTP");
  }

  return res.json();
}

export async function resetPassword(userId: string, newPassword: string) {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("newPassword", newPassword);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Password reset failed");
  }

  return res.json();
}

export async function loginApi(lang: string, email: string, password: string) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login?lang=${lang}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Login failed");
  }

  return res.json();
}