import { Header } from "../components/Header";

export function Landing(){
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
            <Header/>
            <div className="h-screen flex justify-center items-center">
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="text-8xl font-extrabold text-gray-800 tracking-wide">
                        SWIFT PAY
                    </div>
                    <div className="text-2xl text-gray-600">
                        Making online transactions easy
                    </div>
                    <button className="cursor-pointer mt-4 px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition duration-300">
                        Get Started!
                    </button>
                </div>
            </div>
        </div>
    )
}
