import Image from "next/image";

export default function Header() {

    return (
        <div 
            className="relative w-full h-20 flex justify-between flex-wrap content-center px-8 bg-gradient-to-t
            from-[#8787ee]/[0.08] to-[#1919ef]/[0.08] border-[#5c5c7c]/40 border-b-[1px] shadow-md"
        >
            <Image
                src="/face.svg"
                alt="F.ACE Logo"
                width={220}
                height={40}
                className="cursor-pointer select-none"
            />
            <div className="flex justify-between gap-4 flex-wrap">
                <div className="flex flex-col justify-center gap-1 text-right">
                    <h3 className="font-bold leading-none">Геннадий Барбоскин</h3>
                    <h3 className="text-[14px] text-[#8b8ba6] leading-none">Администратор</h3>
                </div>
                <Image
                    src="/user.svg"
                    alt="user alt"
                    width={45}
                    height={45}
                    className="cursor-pointer select-none"
                />
            </div>
        </div>
    )
  }