"use client";
import BackButton from "@/components/constants/BackButton";
import Container from "@/components/constants/Container";
import DeleteAccount from "@/components/constants/DeleteAccount";
import { RadioOption } from "@/components/constants/Form";
import {
    LocationIcon,
    LocPin,
    MailIcon,
    PhoneInputIcon,
    UserIcon,
    UserIcon2,
} from "@/components/constants/Icons";
import { updateProfileApi } from "@/lib/api/user/settings";
import { getCurrentLocation } from "@/lib/getCurrentLocation";
import { useProfileStore } from "@/stores/profile";
import { useMutation } from "@tanstack/react-query";
import Image from "@/components/constants/Image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosCamera } from "react-icons/io";
import { toast } from "sonner";

type Props = {
    lang: string;
};

function ProfileEdit({ lang }: Props) {
    const router = useRouter();
    const { profile,setProfile } = useProfileStore(); // 👈 from Zustand
    const [preview, setPreview] = useState<string | null>(null);
    const [form, setForm] = useState({
        fullName: profile?.name || "",
        email: profile?.email || "",
        phoneNumber: profile?.phoneNumber || "",
        gender: profile?.gender || "",
        image: null as File | null,
        location: {
            address: profile?.location?.address || "",
            lng: profile?.location?.coordinates?.[0] || "",
            lat: profile?.location?.coordinates?.[1] || "",
        },
    });


    useEffect(() => {
        if (profile) {
            setForm({
                fullName: profile?.name || "",
                email: profile?.email || "",
                phoneNumber: profile?.phoneNumber || "",
                gender: profile?.gender || "",
                image: null as File | null,
                location: {
                    address: profile?.location?.address || "",
                    lng: profile?.location?.coordinates?.[0] || "",
                    lat: profile?.location?.coordinates?.[1] || "",
                },
            })
            setPreview(profile?.image || null)
        }
    }, [profile])


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm((prev) => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleGenderChange = (gender: string) => {
        setForm((prev) => ({ ...prev, gender }));
    };

    const handleChange =
        (field: keyof typeof form | "address") =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                if (field === "address") {
                    setForm((prev) => ({
                        ...prev,
                        location: { ...prev.location, address: e.target.value },
                    }));
                } else {
                    setForm((prev) => ({ ...prev, [field]: e.target.value }));
                }
            };

    const handleUpdateLocation = async () => {
        try {
            const location = await getCurrentLocation();
            setForm((prev) => ({
                ...prev,
                location: {
                    ...prev.location,
                    lat: String(location.lat),
                    lng: String(location.lng),
                },
            }));
            toast.success("Location updated");
        } catch (err: any) {
            toast.error(err.message || "Unable to fetch location");
        }
    };
    const mutation = useMutation({
        mutationFn: () => updateProfileApi(lang, {
            name: form?.fullName,
            phoneNumber: form?.phoneNumber,
            email: form?.email,
            gender: form?.gender,
            image: form?.image,
            location: {
                address: form?.location.address,
                lng: String(form?.location?.lng),
                lat: String(form?.location?.lat)
            }
        }),
        onSuccess: ({ data,message }) => {
            // assuming response = { token, user }
            console.log(data,'dadadada')
            setProfile(data)
            toast.success(message);
            router.push(`/${lang}/home`);
        },
        onError: (err: any) => {
            toast.error(err.message || "Invalid credentials");
        },
    });
    const handleSubmit = () => {
        mutation.mutate()
    };


    console.log(form,'form')

    return (
        <div className="pb-[50px]">
            <Container>
                <div className="flex items-center justify-between">
                    <div className="flex gap-[15px] items-center bg-background sticky top-0 pt-[50px] pb-[30px]">
                        <BackButton />
                        <h5 className="font-urbanist font-semibold text-[22px] leading-[130%] tracking-[0]">
                            Profile Details
                        </h5>
                    </div>
                </div>

                <div className="lg:max-w-[456px] max-w-full w-full grid gap-[30px]">
                    {/* Profile Image Upload */}
                    <div className="flex">
                        <label className="relative lg:w-[142px] w-[106px] aspect-square rounded-full flex justify-center items-center bg-background-secondary cursor-pointer mx-auto">
                            <input
                                className="hidden"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Profile Preview"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <div className="absolute">
                                    <UserIcon2 />
                                </div>
                            )}
                            <span className="bg-xarfi-orange w-5 h-5 rounded-full absolute bottom-2.5 right-1.5 flex justify-center items-center">
                                <IoIosCamera size={15} />
                            </span>
                        </label>
                    </div>

                    <div className="grid gap-5">
                        {/* Gender Selection */}
                        <div>
                            <p className="font-urbanist font-semibold text-[16px] mb-2.5">
                                Select Gender
                            </p>
                            <div className="flex gap-[46px]">
                                <RadioOption
                                    label="Man"
                                    selected={form.gender === "man"}
                                    onClick={() => handleGenderChange("man")}
                                    className="p-1"
                                    textClassName="max-lg:text-base"
                                    icon={false}
                                />
                                <RadioOption
                                    label="Woman"
                                    selected={form.gender === "woman"}
                                    onClick={() => handleGenderChange("woman")}
                                    className="p-1"
                                    textClassName="max-lg:text-base"
                                    icon={false}
                                />
                                <RadioOption
                                    label="Other"
                                    selected={form.gender === "all"}
                                    onClick={() => handleGenderChange("other")}
                                    className="p-1"
                                    textClassName="max-lg:text-base"
                                    icon={false}
                                />
                            </div>
                        </div>

                        {/* Full Name */}
                        <label className="px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl">
                            <UserIcon className="w-5" />
                            <input
                                placeholder="Full Name"
                                value={form.fullName}
                                onChange={handleChange("fullName")}
                                className="ml-[10px] flex-1 outline-none bg-transparent font-urbanist text-sm lg:text-[16px]"
                            />
                        </label>

                        {/* Email */}
                        <label className="px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl">
                            <span className="!text-[#FF8C26]" >
                                <MailIcon />
                            </span>
                            <input
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange("email")}
                                className="ml-[10px] flex-1 outline-none bg-transparent font-urbanist text-sm lg:text-[16px]"
                            />
                        </label>

                        {/* Phone */}
                        <label className="px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl">
                            <PhoneInputIcon />
                            <input
                                placeholder="Phone Number"
                                value={form.phoneNumber}
                                onChange={handleChange("phoneNumber")}
                                className="ml-[10px] flex-1 outline-none bg-transparent font-urbanist text-sm lg:text-[16px]"
                            />
                        </label>

                        {/* Address */}
                        <label className="px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl">
                            <LocPin className="text-[#FF8C26]" />
                            <input
                                placeholder="Address"
                                value={form.location.address}
                                onChange={handleChange("address")}
                                className="ml-[10px] flex-1 outline-none bg-transparent font-urbanist text-sm lg:text-[16px]"
                            />
                        </label>

                        {/* Location */}
                        <label className="px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl">
                            <LocPin className="text-[#FF8C26]" />
                            <input
                                placeholder="Location"
                                value={
                                    form.location.lat && form.location.lng
                                        ? `${form.location.lat}, ${form.location.lng}`
                                        : ""
                                }
                                disabled
                                className="ml-[10px] flex-1 outline-none bg-transparent font-urbanist text-sm lg:text-[16px]"
                            />
                            <button
                                type="button"
                                onClick={handleUpdateLocation}
                                className="ml-2"
                            >
                                <LocationIcon />
                            </button>
                        </label>
                    </div>

                    {/* Submit */}
                    <div className="w-full max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:px-4 max-lg:py-[30px] max-lg:bg-background">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="font-urbanist font-semibold text-[16px] text-white rounded-2xl bg-[#FF8C26] w-full py-[18px]"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default ProfileEdit;
