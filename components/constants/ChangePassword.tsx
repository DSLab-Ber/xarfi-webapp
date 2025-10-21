"use client";
import React, { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { CloseIcon, EyeHiddenIcon, EyeIcon, PasswordIcon } from "./Icons";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { changePasswordApi } from "@/lib/api/user/settings";

type Props = {
  children: ReactNode;
};

function ChangePassword({ children }: Props) {
  // 👇 Separate password states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 👇 Separate visibility toggles
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { lang } = useParams();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () =>
      changePasswordApi(lang as string, {
        oldPassword,
        newPassword,
        confirmPassword,
      }),
    onSuccess: (data) => {
      toast.success(data?.message || "Password changed successfully!");
      router.refresh();
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to change password");
    },
  });

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    mutation.mutate();
  };

  const renderPasswordInput = (
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    visible: boolean,
    toggleVisible: () => void
  ) => (
    <label className="px-[15px] py-[20.5px] bg-background-secondary flex items-center rounded-2xl">
      <div className="flex flex-1">
        <PasswordIcon />
        <input
          type={visible ? "text" : "password"}
          placeholder={label}
          value={value}
          onChange={onChange}
          className="ml-[10px] flex-1 outline-none bg-transparent font-urbanist font-normal lg:text-[16px] text-sm"
        />
      </div>
      <button
        type="button"
        className="opacity-60"
        onClick={toggleVisible}
      >
        {visible ? <EyeIcon /> : <EyeHiddenIcon />}
      </button>
    </label>
  );

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="border-none p-[30px] !max-w-[516px] w-full rounded-2xl"
      >
        <div className="grid gap-5 h-full overflow-auto">
          <div className="w-full flex justify-between items-center sticky top-0 z-10 bg-background pb-4">
            <p className="font-urbanist font-semibold text-[22px]">
              Change Password
            </p>
            <DialogClose asChild>
              <button>
                <CloseIcon />
              </button>
            </DialogClose>
          </div>

          {renderPasswordInput("Old Password", oldPassword, (e) =>
            setOldPassword(e.target.value), showOld, () => setShowOld(!showOld)
          )}

          {renderPasswordInput("New Password", newPassword, (e) =>
            setNewPassword(e.target.value), showNew, () => setShowNew(!showNew)
          )}

          {renderPasswordInput("Confirm Password", confirmPassword, (e) =>
            setConfirmPassword(e.target.value), showConfirm, () => setShowConfirm(!showConfirm)
          )}

          <button
            onClick={handleSubmit}
            disabled={mutation.isPending}
            className="bg-xarfi-orange max-w-[530px] w-full rounded-2xl py-[22.5px] font-urbanist font-semibold text-[20px] !text-white disabled:opacity-50"
          >
            {mutation.isPending ? "Updating..." : "Change Password"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePassword;
