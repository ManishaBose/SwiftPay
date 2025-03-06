export function Users(){
    return(
        <div className="flex flex-col">
            <div className="text-bold">
                Users
            </div>
            <input placeholder="Search users..." className="border border-gray-300 rounded-l p-2"/>
            <div className="flex justify-between">
                <div className="flex">
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-2 mr-2">
                        <div className="flex flex-col justify-center h-full">
                            M
                        </div>
                    </div>
                    <div className="flex flex-col justify-center h-full">
                        Manisha Bose
                    </div>
                </div>
                <button type="button" className="m-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    Send Money
                </button>
            </div>
        </div>
    )
}