import { useEffect, useState } from "react";
import User from "../../models/User";
import { Users } from "../../lib/ajax"

export default function UsersPage() {

    const [allUsers, setAllUsers] = useState<User[]>([])

    useEffect(() => {
        const init = async() => {
            setAllUsers(await Users.getUsers());
        }
    }, [])

    return <div>
    
    </div>
}