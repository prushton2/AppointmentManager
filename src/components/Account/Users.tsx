import "./Users.css"

import { useEffect, useState } from "react";
import User from "../../models/User";
import { Users } from "../../lib/ajax"

export default function UsersPage() {

    const [def_allUsers, setDef_allUsers] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [usersHTML, setUsersHTML] = useState<JSX.Element[]>([]);
    

    useEffect(() => {
        const init = async() => {
            setAllUsers((await Users.getUsers())["response"]);   
            setDef_allUsers((await Users.getUsers())["response"]);   
        }
        init();
    }, [])


    useEffect(() => {
        let newUsersHTML: JSX.Element[] = [];
        for(let i in def_allUsers) {
            newUsersHTML[i] = <div className="userBox">
                <button className="saveBtn disabled">Save</button>
                <br />
                <table>
                <tbody>
                <tr>
                    <td>
                        <b>User</b><br />
                        Name <br/>
                        Email
                    </td>
                    <td>
                        <br />
                        <input defaultValue={def_allUsers[i].name}/> <br />
                        <input defaultValue={def_allUsers[i].email}/> <br />
                        <button>Revoke All Sessions</button> <br />
                        <button>Reset Password</button>
                    </td>
                    <td>
                        <b>Permissions</b> <br />
                        <textarea defaultValue={def_allUsers[i].permissions.join("\n")}/>
                    </td>
                </tr>
                </tbody>
                </table>
                <br />
            </div>
        }

        setUsersHTML(newUsersHTML);
    }, [def_allUsers])

    return <div>
        <br /><br />
        {usersHTML}
    </div>
}