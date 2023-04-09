import "./Users.css"

import { useEffect, useState } from "react";
import User from "../../models/User";
import { Users } from "../../lib/ajax"

const UserElement = ({user}: {user: User}) => {

    const [cur_user, setCur_user] = useState<User>(user);
    const [def_user, setDef_user] = useState<User>(user);

    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        setIsChanged(JSON.stringify(cur_user) === JSON.stringify(def_user))
    }, [cur_user])

    const saveUser = async() => {
        await Users.setUser(def_user.id, {
            name: def_user.name,
            email: def_user.email,
            permissions: def_user.permissions,
        })
        setDef_user(cur_user);
    }

    return <div className="userBox">
        <button onClick={() => {saveUser()}} className={`saveBtn ${!isChanged ? "" : "disabled"}`}>Save</button>
        <br />
        <table>
        <tbody>
        <tr>
            <td>
                <b>User</b><br />
                Name <br/>
                Email <br />
                Sessions <br />
                Password
            </td>
            <td>
                <b>{cur_user.id}</b><br />
                <input defaultValue={def_user.name}  onChange={(e) => {setCur_user({...cur_user, name:  e.target.value})}}/> <br />
                <input defaultValue={def_user.email} onChange={(e) => {setCur_user({...cur_user, email: e.target.value})}}/> <br />
                <button>Revoke All Sessions</button> <br />
                <button>Reset Password</button>
            </td>
            <td>
                <b>Permissions</b> <br />
                <textarea defaultValue={def_user.permissions.join("\n")}/>
            </td>
        </tr>
        </tbody>
        </table>
        <br />
    </div>
}


export default function UsersPage() {

    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [usersHTML, setUsersHTML] = useState<JSX.Element[]>([]);
    

    useEffect(() => {
        const init = async() => {
            setAllUsers((await Users.getUsers())["response"]);   
        }
        init();
    }, [])




    useEffect(() => {
        let newUsersHTML: JSX.Element[] = [];
        for(let i in allUsers) {
            newUsersHTML[i] = <UserElement key={i} user={allUsers[i]} />
        }

        setUsersHTML(newUsersHTML);
    }, [allUsers])

    return <div>
        <br /><br />
        {usersHTML}
    </div>
}