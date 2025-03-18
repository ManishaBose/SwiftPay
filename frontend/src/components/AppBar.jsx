import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

export function AppBar () {
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            SwiftPay
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <Menu as="div" className="relative rounded-full h-12 w-12 bg-slate-200 pl-4 mt-1 mr-2 justify-center inline-block ">
                <MenuButton className="flex flex-col justify-center h-full text-xl cursor-pointer">
                    U
                </MenuButton>
                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                    <div className="py-1">
                    <MenuItem>
                        <a
                        onClick={()=>{localStorage.removeItem("SwiftPay Token:")}}
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                        Sign out
                        </a>
                    </MenuItem>
                    </div>
                </MenuItems>
            </Menu>
        </div>
    </div>
}