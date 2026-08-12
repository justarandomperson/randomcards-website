import { Outlet } from "react-router-dom"
import Topbar from "../Topbar/Topbar"

export default function AppLayout()
{
    return (
        <div>
            <Topbar/>
            <Outlet/>
        </div>
    )
}