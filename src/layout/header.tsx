import { Mail, Phone, MapPinned } from "lucide-react"
import Image from "next/image"

export const Header = () => {
    return (
        <header>
            <nav
                className="border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800"
                style={{
                    backgroundImage: "linear-gradient(45deg, #1E90FF, #FF7F50)"
                }}
            >
                <div className="flex flex-wrap justify-center gap-10 items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                            ẢNH MÀU TUẤN ANH
                        </span>
                    </a>
                </div>
            </nav>


            {/* <nav className="bg-[#fff] border-gray-200 py-2.5 dark:bg-gray-800 flex justify-center">
                <div className="flex flex-wrap justify-between items-center w-5/6">
                    <a href="/" className="flex flex-row gap-2 items-center">
                        <Image src="/logo-border.png" alt="logo" width={80} height={80} />
                    </a>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 gap-20">
                        <a href="/" className="flex flex-row gap-2 items-center">
                            <Image src="https://cdn-icons-png.flaticon.com/128/1959/1959251.png" alt="email" width={32} height={32} />
                            <div className="flex flex-col gap-0 text-left">
                                <span className="text-md font-semibold text-[#000]">0939 123 456</span>
                                <span className="text-sm font-light text-black">SĐT Hỗ Trợ</span>
                            </div>
                        </a>
                        <a href="/" className="flex flex-row gap-2 items-center">
                            <Image src="https://cdn-icons-png.flaticon.com/128/819/819865.png" alt="location" width={32} height={32} />
                            <div className="flex flex-col gap-0 text-left">
                                <span className="text-md font-semibold text-[#000]">Cần Thơ</span>
                                <span className="text-sm font-light text-black">Làm việc từ 8h đến 17h</span>
                            </div>
                        </a>
                        <a href="/" className="flex flex-row gap-2 items-center">
                            <Image src="https://cdn-icons-png.flaticon.com/128/2165/2165061.png" alt="email" width={32} height={32} />
                            <div className="flex flex-col gap-0 text-left">
                                <span className="text-md font-semibold text-[#000]">hotro.inanhtructuyen@gmail.com</span>
                                <span className="text-sm font-light text-black">Email hỗ trợ</span>
                            </div>
                        </a>
                    </div>
                    <div className="flex items-center lg:order-2 gap-4">
                        <a href="/tai-khoan" className="hidden md:block lg:block text-[#000] font-medium rounded-lg text-[14px]">ĐĂNG NHẬP</a>
                        <svg className="hidden md:block lg:block" width="24px" height="24px" viewBox="0 -4 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_503_2795)">
                                <rect width="28" height="20" rx="2" fill="white" />
                                <mask id="mask0_503_2795" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20">
                                    <rect width="28" height="20" rx="2" fill="white" />
                                </mask>
                                <g mask="url(#mask0_503_2795)">
                                    <rect width="28" height="20" fill="#EA403F" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14 12.34L10.4733 14.8541L11.7745 10.7231L8.29366 8.1459L12.6246 8.1069L14 4L15.3754 8.1069L19.7063 8.1459L16.2255 10.7231L17.5267 14.8541L14 12.34Z" fill="#FFFE4E" />
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_503_2795">
                                    <rect width="28" height="20" rx="2" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <a href="https://play.google.com/store/search?q=lightroom&c=apps&hl=vi" target="_blank" className="flex flex-row gap-1 bg-[#FF8343] text-white px-8 py-2 rounded-full">
                            Tải App
                        </a>
                    </div>
                </div>
            </nav > */}
        </header >
    )
}