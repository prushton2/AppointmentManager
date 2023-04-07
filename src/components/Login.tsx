import "./Login.css"
import { useEffect, useState } from "react";


export default function Login() {
    return <div className="parentDiv">
        <div className="loginBox">
            <h2>Login</h2>
            <div className="loginTable">
            <table>
            <tbody>
                <tr>
                    <td>
                        <label>Username</label>
                    </td>
                    <td>
                        <input />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Password</label>
                    </td>
                    <td>
                        <input />
                    </td>
                </tr>
            </tbody>
            </table>
            <br />
            <br />
            <button className="largeButton">Login</button>
            </div>
        </div>
    </div>
}