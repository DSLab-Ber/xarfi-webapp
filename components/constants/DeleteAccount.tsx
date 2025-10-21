import React, { ReactNode } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { LogoutIcon, ProfileStatsIcon } from './Icons'
import { useMutation } from '@tanstack/react-query';
import { deleteProfileApi, updateProfileApi } from '@/lib/api/user/settings';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type Props = {
    children: ReactNode;
    lang: string;
}

function DeleteAccount({ children, lang }: Props) {
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: () => deleteProfileApi(lang),
        onSuccess: ({ data }) => {
            // assuming response = { token, user }
            // setProfile(data?.user)
            toast.success(data.message);
            router.push(`/`);
        },
        onError: (err: any) => {
            toast.error(err.message || "Invalid credentials");
        },
    });

    const deleteAccount = () => {
        mutation.mutate()
    }
    return (
        <Dialog>
            <DialogTrigger className='w-full'>{children}</DialogTrigger>
            <DialogContent showCloseButton={false} className='border-none p-[50px] !max-w-[516px] w-full rounded-2xl'>
                <div className='w-full flex flex-col items-center justify-center gap-5'>
                    <ProfileStatsIcon />
                    <div className='text-center gap-1'>
                        <h5 className='font-urbanist font-bold md:text-[20px] text-[18px] leading-[28px] tracking-[0]'>Delete Account</h5>
                        <p className='font-urbanist font-normal text-[14px] leading-[20px] tracking-[0] text-center'>Are you sure you want to delete the account with this
                            you will not be able to recover your account.</p>
                    </div>
                    <div className='grid grid-cols-2 gap-5 w-full'>
                        <button className="bg-xarfi-orange w-full rounded-2xl md:py-[22.5px] py-[14px] font-urbanist font-semibold md:text-[20px] text-[16px] leading-[20px] tracking-[0] !text-white">
                            Cancel
                        </button>
                        <button className='font-urbanist font-semibold text-[16px] leading-[20px] !text-white tracking-[0] rounded-2xl bg-[#FF0F0F] w-full md:py-[18px] py-[16px]'
                        onClick={deleteAccount}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteAccount