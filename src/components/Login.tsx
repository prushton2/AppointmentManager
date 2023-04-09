import "./Login.css"
import { useEffect, useState } from "react";

import { Account } from "../lib/ajax";
import { AxiosError } from "axios";

export default function Login() {

    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [response, setResponse] = useState(<label />);
    

    const login = async() => {
        let res;
        try {
            res = await Account.Login(name, pass);
            console.log(res);
            setResponse(<label className="loginSuccessLabel">Login Successful</label>);
            setTimeout(() => {window.location.href="/account"}, 1000);

        } catch (e) {
            console.log((e as AxiosError).response?.data);
            setResponse(<label className="loginErrorLabel">Incorrect Login Information</label>)
        }

    }

    useEffect(() => {

        const init = async() => {
            try {
                let res = await Account.getUserInfo();
                window.location.href="/account";
            } catch (e) {
                console.log((e as AxiosError).response?.data);
            }
        }

        init()
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