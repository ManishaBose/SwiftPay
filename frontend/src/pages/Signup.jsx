import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/Subheading";
import { ButtonWarning } from "../components/ButtonWarning"

export function Signup(){
    return(
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"}/>
                    <SubHeading label={"Enter your information to create an account"}/>
                    <InputBox label={"First Name"} placeholder={"Manisha"}/>
                    <InputBox label={"Last Name"} placeholder={"Bose"}/>
                    <InputBox label={"Email"} placeholder={"manisha@abc.com"}/>
                    <InputBox label={"Password"} placeholder={"******"}/>
                    <div className="pt-4">
                        <Button label={"Sign up"}/>
                    </div>
                    <ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )
}