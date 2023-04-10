import "./Users.css"
import 'react-confirm-alert/src/react-confirm-alert.css';

import { useEffect, useState } from "react";
import User from "../../models/User";
import { Users } from "../../lib/ajax"
import { AxiosError } from "axios";
import { confirmAlert } from "react-confirm-alert";
import { alertService, axiosService } from "../../lib/utils";

const UserElement = ({user}: {user: User}) => {

    const [cur_user, setCur_user] = useState<User>(user);
    const [def_user, setDef_user] = useState<User>(user);

    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        setIsChanged(JSON.stringify(cur_user) === JSON.stringify(def_user))
    }, [cur_user, def_user])

    const saveUser = async() => {
        await Users.setUser(cur_user.id, {
            name: cur_user.name,
            email: cur_user.email,
            permissions: cur_user.permissions,
            sessions: cur_user.sessions,
        })
        setDef_user(cur_user);
    }

    const resetPassword = async() => {
        const run = async() => {
            try {
                await Users.resetPassword(cur_user.id);
                alertService.alert("Password Reset", "Password was reset to 'password'")
            } catch (e) {
                alertService.fail("Password Reset", axiosService.errorToString(e as AxiosError));
            }
        }

        alertService.confirm("Are you sure?", "Reset Password", () => run());

    }

    return <div className="userBox left">
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
                <button onClick={() => {setCur_user({...cur_user, sessions: []})}}>Revoke All Sessions</button> <br />
                <button onClick={() => {resetPassword()}}>Reset Password</button>
            </td>
            <td>
                <b>Permissions</b> <br />
                <textarea defaultValue={def_user.permissions.join("\n")} onChange={(e) => {setCur_user({...cur_user, permissions: e.target.value.split("\n")})}}/>
            </td>
        </tr>
        </tbody>
        </table>
        <br />
    </div>
}

const CreateUser = ({}: {}) => {

    const [cur_user, setCur_user] = useState<User>({} as User);
    const [password, setPassword] = useState("");

    const CreateUser = async() => {
        try {
            await Users.createUser({...cur_user, password: password});
            
        } catch (e) {
            console.log((e as AxiosError).response?.data)
        }
    }

    return <div className="userBox right">
        <table>
        <tbody>
        <tr>
            <td>
                <b>New User</b><br />
                Name <br/>
                Email <br />
                Password <br />
            </td>
            <td>
                <b></b><br />
                <input onChange={(e) => {setCur_user({...cur_user, name:  e.target.value})}}/> <br />
                <input onChange={(e) => {setCur_user({...cur_user, email: e.target.value})}}/> <br />
                <input onChange={(e) => {setPassword(e.target.value)}}/> <br />
            </td>
            <td>
                <b>Permissions</b> <br />
                <textarea onChange={(e) => {setCur_user({...cur_user, permissions: e.target.value.split("\n")})}}/>
            </td>
        </tr>
        </tbody>
        </table>
        <div style={{width: "fit-content", margin: "auto"}}>
            <button onClick={() => {CreateUser()}} className="largeButton">Create User</button>
        </div>
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
        <CreateUser />
        {usersHTML}
    </div>
}