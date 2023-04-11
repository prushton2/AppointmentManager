import "./Users.css"
import 'react-confirm-alert/src/react-confirm-alert.css';

import { useEffect, useState } from "react";
import User from "../../models/User";
import { Users } from "../../lib/ajax"
import { AxiosError, all } from "axios";
import { alertService, axiosService } from "../../lib/utils";
import {ToastsStore} from 'react-toasts';

const UserElement = ({user, id}: {user: User, id: number}) => {

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

    return <div className={`userBox ${id%2 === 0 ? "left" : "right"}`} style={{top: `${3.2 + 16*Math.floor(id/2)}em`}}  >
        <button onClick={() => {saveUser()}} className={`saveBtn ${!isChanged ? "" : "disabled"}`}>Save</button>
        <br />
        <table>
        <tbody>
        <tr>
            <td>
                <b>User ID</b><br />
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
    const [confPassword, setConfPassword] = useState("");

    const CreateUser = async() => {
        if(password !== confPassword) {
            alertService.fail("Create User Failed", "Passwords do not match");
            return;
        }

        try {
            await Users.createUser({...cur_user, password: password});
        } catch (e) {
            ToastsStore.error(axiosService.errorToString(e as AxiosError));
        }
    }

    return <div className="userBox createUser">
        <table>
        <tbody>
        <tr>
            <td>
                <b>New User</b><br />
                Name <br/>
                Email <br />
                Password <br />
                Confirm <br />
            </td>
            <td>
                <b></b><br />
                <input onChange={(e) => {setCur_user({...cur_user, name:  e.target.value})}}/> <br />
                <input onChange={(e) => {setCur_user({...cur_user, email: e.target.value})}}/> <br />
                <input onChange={(e) => {setPassword(e.target.value)}} type="password"/> <br />
                <input onChange={(e) => {setConfPassword(e.target.value)}} type="password"/> <br />
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
    
    const [searchString, setSearchString] = useState<string>("");
    const [searchParam, setSearchParam] = useState<string>("name");

    useEffect(() => {
        const init = async() => {
            setAllUsers((await Users.getUsers())["response"]);  
            setUsersHTML([]);
        }
        init();
    }, [])


    function getSearchParam(v: User) {
        switch(searchParam) {
            case "email":
                return structuredClone(v).email;
            case "permissions":
                return structuredClone(v).permissions.join("\n");
            default:
                return structuredClone(v).name;
        }
    }

    useEffect(() => {
        //this needs to be so complex because of how react handles lists of JSX. (not my fault)
        //We need to clear the list before rewriting it
        if(JSON.stringify(usersHTML) !== "[]") { return; }

        let users = structuredClone(allUsers);
        
        // console.log((allUsers[0])[searchParam as keyof User]);

        let filteredUsers: User[] = users.filter((v: User) => {return getSearchParam(v).toLowerCase().indexOf(searchString.toLowerCase()) !== -1})

        let newUsersHTML: JSX.Element[] = [];
        for(let i in filteredUsers) {
            newUsersHTML[i] = <UserElement key={i} id={parseInt(i)} user={filteredUsers[i]} />
        }

        if(JSON.stringify(newUsersHTML) !== JSON.stringify(usersHTML)) {
            setUsersHTML(newUsersHTML);
        }
    }, [usersHTML])

    useEffect(() => {
        setUsersHTML([]);
    }, [searchString, searchParam])

    return <div style={{position: "relative"}}>
        <br />
        
        <select onChange={(e) => setSearchParam(e.target.value)}>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="permissions">Permissions</option>
        </select>
        {'\u00A0'}{'\u00A0'}

        <input className="searchBox" placeholder="Search..." onChange={(e) => setSearchString(e.target.value)}/>
        <br />
        <CreateUser />
        {usersHTML}
    </div>
}