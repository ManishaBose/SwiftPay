import { useEffect, useState } from "react"
import {Button} from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users(){
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([])
    
    //to add: debouncing
    useEffect(()=>{
        const userToken = localStorage.getItem("SwiftPay Token:")
        const AuthStr = 'Bearer '.concat(userToken); 
        axios.get("https://swiftpay-backend.onrender.com/api/v1/user/bulk", { 
            headers: { Authorization: AuthStr },
            params: {filter}
        }).then(response =>{
            setUsers(response.data.users);
        })
    },[filter])

    return(
        <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" onChange={e=>setFilter(e.target.value)}></input>
        </div>
        <div className="pt-4">
            {users.map(user => <User user={user} key={user.username}/>)}
        </div>
    </>
    )
}

function User({user}){
    const navigate = useNavigate();
    return(
        <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
                <Button label={"Send Money"} onClick={(e)=>{
                    navigate("/send?id="+user.id+"&name="+user.firstName)
                }}/>
        </div>
    </div>
    )
}