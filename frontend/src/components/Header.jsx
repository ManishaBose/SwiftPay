export function Header(){
    return(
        <div className="p-3">
            <nav className="bg-white border border-gray-300 rounded-full shadow-md px-6 py-3 flex justify-between items-center">
                <a href="/"> 
                    <img src="logo.png" className="h-12 transition-transform duration-300 hover:scale-105"/>
                </a>
                <a href="/signup" className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition-colors duration-300">
                    Signin {"->"}
                </a>
            </nav>
        </div>
    )
}