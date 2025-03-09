import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/Subheading";

export function Signin(){
    return(
         <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"}/>
                    <SubHeading label={"Enter your credentials to access your account"}/>
                    <InputBox label={"Email"} placeholder={"manisha@example.com"}/>
                    <InputBox label={"Password"} placeholder={"******"}/>
                    <div className="pt-4">
                        <Button label={"Sign in"}/>
                    </div>
                    <ButtonWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
                </div>
            </div>
        </div>
    )
}