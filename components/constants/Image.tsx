'use client'
import Image from "next/image"
import { useState } from "react"

function FallbackImage({ src, alt, ...props }: any) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...props}
      alt={alt}
      src={imgSrc || '/assets/imageplaceholder.png'}
      onError={() => setImgSrc('/assets/imageplaceholder.png')}
    />
  )
}
export default FallbackImage