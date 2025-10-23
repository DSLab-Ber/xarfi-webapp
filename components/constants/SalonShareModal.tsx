"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share"
import { Copy, Check, Share2 } from "lucide-react"
import { toast } from "sonner"
import { ShareIcon } from "./Icons"

interface ShareModalProps {
  url?: string
  title?: string
  description?: string
  children?: React.ReactNode
}

export function ShareModal({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "Check this out!",
  description = "I found something interesting to share with you.",
  children,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success("Link copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

  const shareButtons = [
    {
      name: "Twitter",
      Button: TwitterShareButton,
      Icon: TwitterIcon,
    },
    {
      name: "Facebook",
      Button: FacebookShareButton,
      Icon: FacebookIcon,
    },
    {
      name: "LinkedIn",
      Button: LinkedinShareButton,
      Icon: LinkedinIcon,
    },
    {
      name: "WhatsApp",
      Button: WhatsappShareButton,
      Icon: WhatsappIcon,
    },
    {
      name: "Email",
      Button: EmailShareButton,
      Icon: EmailIcon,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <button
            className="h-[39px] aspect-square bg-background-secondary rounded-[10px] flex items-center justify-center max-md:hidden outline-none "
          >
            <ShareIcon />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-none">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>Share this link across your favorite platforms</DialogDescription>
        </DialogHeader>

        {/* Social Platforms Grid */}
        <div className="grid grid-cols-5 gap-3 py-4">
          {shareButtons.map(({ name, Button: ShareButton, Icon }) => (
            <ShareButton
              key={name}
              url={url}
              title={title}
              body={description}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200 hover:opacity-80"
              aria-label={`Share on ${name}`}
            >
              <Icon size={32} round />
              <span className="text-xs font-medium text-center">{name}</span>
            </ShareButton>
          ))}
        </div>

        {/* Copy Link Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Copy Link</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 px-3 py-2 text-sm border rounded-lg bg-muted text-muted-foreground"
            />
            <Button onClick={handleCopyLink} variant="outline" size="sm" className="gap-2 bg-transparent">
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
