import Image from './Image'
import React from 'react'
function UploadImage({ handleImageUpload, image }: any) {
    return (
        <label className="min-w-full flex items-center cursor-pointer justify-center rounded-2xl aspect-square bg-[#FF8C261A] border border-[#FF8C26]">
            <div className="flex flex-col justify-center items-center">
                {image ? (
                    <Image src={image} alt="Uploaded" className="object-cover w-full h-full rounded-2xl" />
                ) : (
                    <>
                        <Image width={250} height={250} alt='galleryIcon' src={'/assets/galleryIcon.png'} className="mb-[13px]" />
                        <h5 className="font-urbanist font-bold text-[22px] text-center text-xarfi-orange">
                            Upload salon images
                        </h5>
                        <p className="font-urbanist font-medium text-[14px] text-center text-xarfi-orange">(up to 6 images)</p>
                    </>
                )}
                <input type="file" className="hidden" onChange={handleImageUpload} />
            </div>
        </label>
    )
}

export default UploadImage