import { CheckIcon } from "./Icons"


export const InputField = ({ placeholder, value, onChange, type = "text", disabled = false }: any) => (
    <label className="px-[15px] w-full py-[20.5px] bg-background-secondary flex items-center rounded-2xl">
        <input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="ml-[10px] flex-1 outline-none bg-transparent font-urbanist font-normal text-[16px]"
        />
    </label>
)

export const TextAreaField = ({ placeholder, value, onChange, }: any) => (
    <label className="px-[15px] w-full py-[20.5px] bg-background-secondary flex items-center rounded-2xl">
        <textarea
            rows={3}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="ml-[10px] flex-1 outline-none bg-transparent font-urbanist font-normal text-[16px]"
        ></textarea>
    </label>
)

export const RadioOption = ({ label, selected, onClick, icon = true, className, textClassName = "" }: any) => (
    <div className={"flex gap-[10px] items-center cursor-pointer "} onClick={onClick}>
        <div
            className={`radio w-[26px] h-[26px] rounded-full border border-[#FF8C26] flex items-center justify-center   ${className}`}
        >
            {selected ?
                <div className="bg-xarfi-orange w-full h-full rounded-full flex justify-center items-center">
                    {icon ?
                        <>
                            {selected && <CheckIcon />}
                        </>
                        : null}
                </div>
                : null}
        </div>
        <p className={"font-bold lg:text-[14px] text-sm leading-[100%] tracking-[0%] font-urbanist " + textClassName}>{label}</p>
    </div>
)