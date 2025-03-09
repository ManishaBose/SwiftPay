import { useState } from "react";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return(
         <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"}/>
                    <SubHeading label={"Enter your credentials to access your account"}/>
                    <InputBox onChange={(e)=>{
                        setUsername(e.target.value)
                    }}
                        label={"Email"} placeholder={"manisha@example.com"}/>
                    <InputBox onChange={(e)=>{
                        setPassword(e.target.value)
                    }} label={"Password"} placeholder={"******"}/>
                    <div className="pt-4">
                        <Button onClick={async()=>{
                            try{
                                console.log("here")
                                const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                                    username,
                                    password
                                })
                                localStorage.removeItem("SwiftPay Token:")
                                localStorage.setItem("SwiftPay Token:", response.data.token)
                                navigate("/dashboard")
                            } catch(e){
                                if(e.response){
                                    alert(`Error: ${e.response.status} ${e.response.data.message}`)
                                }
                            }
                        }}label={"Sign in"}/>
                    </div>
                    <ButtonWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
                </div>
            </div>
        </div>
    )
}