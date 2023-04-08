import "./Login.css"
import { useEffect, useState } from "react";

import { Account } from "../lib/ajax";

export default function Login() {

    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [response, setResponse] = useState(<label />);
    

    const login = async() => {
        let res = await Account.Login(name, pass);
        console.log(res)
        setResponse(<label className="loginErrorLabel">Incorrect Login Information</label>)
    }

    useEffect(() => {

    }, [])



    return <div className="parentDiv">
        <div className="loginBox">
            <h2>Login</h2>
            <div className="loginTable">
            {response} <br />
            <table>
            <tbody>
                <tr>
                    <td>
                        <label>Username</label>
                    </td>
                    <td>
                        <input onChange={(e) => setName(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Password</label>
                    </td>
                    <td>
                        <input onChange={(e) => setPass(e.target.value)} type="password" />
                    </td>
                </tr>
            </tbody>
            </table>
            <br />
            <br />
            <button className="largeButton" onClick={() => login()}>Login</button>
            </div>
        </div>
    </div>
}