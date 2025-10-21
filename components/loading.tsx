'use client'
import { useTheme } from '@/providers/theme-provider';
import React from 'react'

type Props = {}

function LoadingComponent({ }: Props) {
  const { theme, toggleTheme, logo } = useTheme();

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Logo with rotation animation */}
        <div className="relative">
          <img
            src={logo}
            alt="Loading"
            width={300}
            height={300}
            className="drop-shadow-lg h-[90px] object-cover"
          />
          {/* Pulsing ring around logo */}
          {/* <div className="absolute inset-0 rounded-lg border-2 border-orange-400/30 animate-pulse"></div> */}
        </div>

        {/* Loading text and spinner */}
        <div className="text-center">

          {/* Interactive spinner */}
          <div className="relative w-12 h-12 mx-auto">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-2 border-orange-300 border-b-transparent rounded-full animate-spin animate-reverse" style={{ animationDuration: '1.5s' }}></div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LoadingComponent