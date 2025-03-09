import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/Subheading";
import { ButtonWarning } from "../components/ButtonWarning"
import { useState } from "react";
import axios from "axios";

export function Signup(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    return(
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"}/>
                    <SubHeading label={"Enter your information to create an account"}/>
                    <InputBox onChange={e =>{
                        setFirstName(e.target.value);
                    }} label={"First Name"} placeholder={"Manisha"}/>
                    <InputBox onChange={e =>{
                        setLastName(e.target.value);
                    }} label={"Last Name"} placeholder={"Bose"}/>
                    <InputBox onChange={e =>{
                        setUsername(e.target.value);
                    }} label={"Email"} placeholder={"manisha@example.com"}/>
                    <InputBox onChange={e =>{
                        setPassword(e.target.value);
                    }} label={"Password"} placeholder={"******"}/>
                    <div className="pt-4">
                        <Button onClick={async()=>{
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                                firstName,
                                lastName,
                                username,
                                password
                            })
                            //to store the jwt token in the browser
                            localStorage.setItem("SwiftPay Token:", response.data.token);
                            //to remove: localStorage.removeItem("SwiftPay Token")
                        }}label={"Sign up"}/>
                    </div>
                    <ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )
}