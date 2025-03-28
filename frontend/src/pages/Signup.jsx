import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { ButtonWarning } from "../components/ButtonWarning"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const navigate = useNavigate();
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
                    }} label={"Password"} placeholder={"******"} type={"password"}/>
                    <div className="pt-4">
                        <Button onClick={async()=>{
                            try{
                                const response = await axios.post("https://swiftpay-backend.onrender.com/api/v1/user/signup",{
                                    firstName,
                                    lastName,
                                    username,
                                    password
                                })
                                //to remove existing token
                                localStorage.removeItem("SwiftPay Token:")
                                //to store the jwt token in the browser
                                localStorage.setItem("SwiftPay Token:", response.data.token);
                                navigate("/dashboard")
                            }catch(e){
                                if(e.response){
                                    alert(`Error code: ${e.response.status} ${e.response.data.message}`)
                                } else{
                                    alert("Network error. Please check your connection.")
                                }
                            }
                        }}label={"Sign up"}/>
                    </div>
                    <ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )
}