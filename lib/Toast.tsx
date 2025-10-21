"use client"
import { useTheme } from "@/providers/theme-provider";
import { Toaster } from "sonner";


function Toast() {
    const { theme } = useTheme();
    return (
        <Toaster position="top-center" theme={theme} />
    )
}

export default Toast