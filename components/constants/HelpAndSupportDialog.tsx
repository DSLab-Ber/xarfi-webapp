"use client";
import React, { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { CloseIcon } from "./Icons";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { contactApi } from "@/lib/api/user/settings";

type Props = {
    children: ReactNode;
};

function HelpAndSupportDialog({ children }: Props) {
    const { lang } = useParams(); // get lang from URL
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const mutation = useMutation({
        mutationFn: () =>
            contactApi(lang as string, { fullName, email, message }),
        onSuccess: (data) => {
            toast.success(data?.message || "Support request sent!");
            setFullName("");
            setEmail("");
            setMessage("");
        },
        onError: (err: any) => {
            toast.error(err?.message || "Failed to send request");
        },
    });

    const handleSubmit = () => {
        if (!fullName || !email || !message) {
            toast.error("Please fill all fields");
            return;
        }
        mutation.mutate();
    };

    return (
        <Dialog>
            <DialogTrigger className="w-full">{children}</DialogTrigger>
            <DialogContent
                showCloseButton={false}
                className="border-none p-[30px] !max-w-[516px] w-full rounded-2xl"
            >
                <div className="grid gap-5 h-full overflow-auto">
                    <div className="w-full flex justify-between items-center sticky top-0 z-10 bg-background pb-4">
                        <p className="font-urbanist font-semibold text-[22px] leading-[130%]">
                            Help & Support
                        </p>
                        <DialogClose asChild>
                            <button>
                                <CloseIcon />
                            </button>
                        </DialogClose>
                    </div>

                    {/* Full Name */}
                    <label className="px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl">
                        <input
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="ml-[10px] flex-1 outline-none bg-transparent font-urbanist text-sm"
                        />
                    </label>

                    {/* Email */}
                    <label className="px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl">
                        <input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="ml-[10px] flex-1 outline-none bg-transparent font-urbanist text-sm"
                        />
                    </label>

                    {/* Message */}
                    <label className="px-[15px] py-[20.5px] bg-background-secondary flex flex-col rounded-2xl">
                        <textarea
                            placeholder="Message Here"
                            rows={6}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="ml-[10px] flex-1 outline-none bg-transparent font-urbanist text-sm"
                        ></textarea>
                    </label>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={mutation.isPending}
                        className="bg-xarfi-orange max-w-[530px] w-full rounded-2xl py-[22.5px] font-urbanist font-semibold text-[20px] !text-white disabled:opacity-50"
                    >
                        {mutation.isPending ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default HelpAndSupportDialog;
