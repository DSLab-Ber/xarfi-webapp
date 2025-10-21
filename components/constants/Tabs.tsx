import React from 'react'
interface props {
    tabs: any;
    activeTab: any;
    setActiveTab: any;
    className?: string;
}
function Tabs({ tabs, activeTab, setActiveTab, className }: props) {
    return (
        <div className={`p-2.5 rounded-full bg-background-secondary grid gap-2.5 mb-5 ${className}`}>
            {tabs.map((a: any, i: number) => (
                <div key={i} className={`${activeTab === a ? 'bg-xarfi-orange !text-white' : ''} w-full py-[9px] text-center rounded-full font-urbanist font-semibold text-base text-[14px] leading-[130%] tracking-[0] cursor-pointer max-md:px-5`}
                    onClick={() => {
                        setActiveTab(a)
                    }}
                >
                    {a}
                </div>
            ))}
        </div>
    )
}

export default Tabs