import { Modal } from 'antd'
import React, { useState } from 'react'
import { CloseIcon } from '../../../../components/constants/Icons'
import UploadImage from '../../../../components/constants/UploadImage'
import { InputField, TextAreaField } from '../../../../components/constants/Form'

function AddServiceDialogue({
    isModalOpen,
    setIsModalOpen,
    showModal,
    handleOk,
    handleCancel
}) {
    const [image, setImage] = useState(null)
    const [obj,setObj] = useState({

    })
    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setImage(imageUrl)
        }
    }
    return (
        <Modal
            footer={false}
            closeIcon={false}
            rootClassName='addServiceModal'
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div className='p-[50px]'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold text-[32px] leading-[130%] tracking-[0px] font-urbanist'>
                        Add Service
                    </h2>
                    <button className=''>
                        <CloseIcon />
                    </button>
                </div>
                <div className='flex mt-5'>
                    <div className="w-1/3">
                        <UploadImage handleImageUpload={handleImageUpload} image={image} />
                    </div>
                    <div className="w-2/3">
                        <div className="grid gap-[15px] grid-cols-2">
                            <div className='col-span-2'>
                                <InputField placeholder="Service Name" value={salonName} onChange={setSalonName} />
                            </div>
                            <div className='col-span-2'>
                                <InputField placeholder="Service Category" value={salonName} onChange={setSalonName} />
                            </div>
                            <div className='col-span-2'>
                                <TextAreaField placeholder="Description (Optional)" value={salonName} onChange={setSalonName} />
                            </div>
                            <div>
                                <InputField type='time' placeholder="Start Time" onChange={(value) => {
                                    

                                }} />
                            </div>
                            <div>
                                <InputField type='number' placeholder="Start Time" onChange={(value) => {
                                    

                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AddServiceDialogue