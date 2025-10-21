import React, { useState } from 'react';
import { Steps, Button, message } from 'antd';
import Container from '../../../components/constants/Container';
import BackButton from '../../../components/constants/BackButton';
import './steps.css'
import { CheckIcon } from '../../../components/constants/Icons';
import SaloonDetails from './SaloonDetails';
import AddService from './AddService/AddService';




const customSteps = [
    {
        title: 'Salon Details',
        description: 'This is a description.',
    },
    {
        title: 'Services',
        description: 'This is a description.',
    },
    {
        title: 'Masters',
        description: 'This is a description.',
    },
    {
        title: 'Styles',
        description: 'This is a description.',
    },
    {
        title: 'Products',
        description: 'This is a description.',
    },
    {
        title: 'Documents   ',
        description: 'This is a description.',
    },
    {
        title: 'Bank Details',
        description: 'This is a description.',
    }
];

function StepsComponent() {
    const [current, setCurrent] = useState(0);
    const [SaloonData, setSaloonData] = useState({})



    const next = () => setCurrent(prev => prev + 1);
    const prev = () => setCurrent(prev => prev - 1);

    const items = customSteps.map((step, index) => {
        let className = '';

        if (index === current - 1) {
            className = 'is-before-active';
        }

        return {
            title: step.title,
            description: step.description,
            className, // 👈 inject class
        };
    });

    return (
        <div className='w-full py-[50px]'>
            <Container>
                <div className='flex flex-col gap-[25px] items-start'>
                    <BackButton onClick={() => {
                        prev()
                    }} />
                    <div>
                        <h4 className='font-urbanist font-bold text-[55px] leading-[100%] mb-[15px]'>Signup</h4>
                    </div>
                </div>
                <div className="step-wrapper min-h-screen mt-[25px]">
                    <Steps
                        progressDot
                        current={current}
                        items={items}
                        className="custom-steps"
                    />

                    <div className="step-content mt-10">
                        {current === 0 ?
                            <SaloonDetails next={next} />
                            :
                            <AddService />
                        }
                    </div>

                    {/* <div style={{ marginTop: 24 }}>
                        {current < customSteps.length - 1 && (
                            <Button type="primary" onClick={next}>
                                Next
                            </Button>
                        )}
                        {current === customSteps.length - 1 && (
                            <Button type="primary" onClick={() => message.success('Completed!')}>
                                Done
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={prev}>
                                Previous
                            </Button>
                        )}
                    </div> */}

                </div>
            </Container>
        </div>
    );
}

export default StepsComponent;
