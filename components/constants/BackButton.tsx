"use client"
import React from 'react'
import { BackIcon } from './Icons'
import { useRouter } from 'next/navigation'

function BackButton({ onClick }: any) {
  const router = useRouter()

  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick()
        } else {
          router.back()
        }
      }}
      className="text-white lg:py-5 py-3 lg:px-[22.5px] px-[15px] bg-background-secondary rounded-[10px] mr-[15px]"
    >
      <BackIcon />
    </button>
  )
}

export default BackButton
