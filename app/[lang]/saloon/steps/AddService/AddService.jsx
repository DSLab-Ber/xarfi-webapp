import React, { useEffect, useState } from 'react'
import addService from './../../../../assets/addService.png'
import AddServiceDialogue from './AddServiceDialogue';

function AddService() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [services,setServices] = useState([])
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='w-full flex justify-center items-center py-[92px]'>
            <div className='max-w-[404px]'>
                <img src={addService} className=' h-auto w-full' />
                <h4 className='font-semibold text-[24px] leading-[20px] tracking-[0px] text-center font-urbanist text-center'>No Services Added!</h4>
                <p className='font-medium text-[18px] leading-[20px] tracking-[0px] font-urbanist !text-[#acacac] text-center mt-[10px]'>Tap button below to add a service</p>
                <div className='w-full flex justify-center'>
                    <button className='text-white bg-xarfi-orange rounded-2xl max-w-[205px] mt-[15px] w-full py-[22.5px] font-urbanist font-semibold text-[20px] leading-[100%]'
                        onClick={() => {
                            showModal()
                        }}
                    >
                        Add Services
                    </button>
                    <AddServiceDialogue isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        showModal={showModal}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        setServices={setServices}
                        services={services}
                    />
                </div>
            </div>
        </div>
    )
}

export default AddService