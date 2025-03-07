import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard(){
    return(
        <div>
            <AppBar/>
            <div className="p-5">
                <Balance value={"5000"}/>
                <Users/>
            </div>
        </div>
    )
}