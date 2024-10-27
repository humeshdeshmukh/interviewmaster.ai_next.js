export const ChipBanner = ({ text } : { text: string }) => {
    return (
        <div className="group relative w-fit flex space-x-2 items-center z-10 bg-background hover:bg-[#fcba28] py-0.5 px-4 ring-1 ring-white/10 rounded-full border-2 border-[#fcba28] transition-colors duration-300 ease-linear">
            <span className="text-xs font-black tracking-wider leading-6 text-[#fcba28] group-hover:text-background uppercase">
                {text}
            </span>
        </div>
    )
}