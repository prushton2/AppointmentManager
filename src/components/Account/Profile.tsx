import "./Profile.css"
import "../../App.css"
import { useEffect, useState } from "react";
import { Account } from "../../lib/ajax";
import User from "../../models/User";
import axios, { AxiosError } from "axios";
import { alertService, axiosService } from "../../lib/utils";

const ChangePassword = ({userInfo}: {userInfo: User}) => {

    const [old, setOld] = useState(""); //old pw
    const [npw, setNpw] = useState(""); //new pw
    const [chk, setChk] = useState(""); //check pw

    const [errorLabel, setErrorLabel] = useState("");
    const [successLabel, setSuccessLabel] = useState("");

    async function ChangePassword() {
        if(npw !== chk || (npw === "" && chk === "")) {
            setErrorLabel("Passwords do not match");
            return;
        }
        setErrorLabel("");

        try {
            await Account.ChangePassword(old, npw);
            setSuccessLabel("Password Changed");
        } catch (e) {
            setErrorLabel(axiosService.errorToString(e as AxiosError));
        }
    }

    return <div>
        <b>Change Password</b>
        <table>
        <tbody>
        <tr>
            <td>
                Current Password <br />
                New Password <br />
                Repeat Password <br />
            </td>
            <td>
                <input onChange={(e) => setOld(e.target.value)} type="password"/> <br />
                <input onChange={(e) => setNpw(e.target.value)} type="password"/> <br />
                <input onChange={(e) => setChk(e.target.value)} onKeyDown={(e) => {if(e.code === "Enter") {ChangePassword()}}} type="password"/> <br />
            </td>
        </tr>
        </tbody>
        </table>
        <label className="errorLabel">{errorLabel}</label>
        <label className="successLabel">{successLabel}</label>
        <br />
        <button className="largeButton" onClick={() => {ChangePassword()}}>Change</button>
    </div>
}

const ChangeEmail = ({userInfo}: {userInfo: User}) => {

    const [newEmail, setNewEmail] = useState("");

    const [errorLabel, setErrorLabel] = useState("");
    const [successLabel, setSuccessLabel] = useState("");


    async function saveEmail()  {
        try {
            await Account.changeProp("email", newEmail);
            setSuccessLabel("Email Changed");
        } catch (e) {
            setErrorLabel(axiosService.errorToString(e as AxiosError));
        }
    }

    return <div>
        <b>Change Email</b>
        <table>
        <tbody>
        <tr>
            <td>
                Email Address
            </td>   
            <td>
                <input defaultValue={userInfo.email} onChange={(e) => setNewEmail(e.target.value)}/>
            </td>
        </tr>
        </tbody>
        </table>

        <label className="errorLabel">{errorLabel}</label>
        <label className="successLabel">{successLabel}</label> 
        <br />

        <button onClick={() => saveEmail()} className="largeButton">Save Email</button>
    </div>
}

const ChangeName = ({userInfo}: {userInfo: User}) => {

    const [newName, setNewName] = useState("");

    const [errorLabel, setErrorLabel] = useState("");
    const [successLabel, setSuccessLabel] = useState("");


    async function saveName()  {
        try {
            await Account.changeProp("name", newName);
            setSuccessLabel("Name Changed");
        } catch (e) {
            setErrorLabel(axiosService.errorToString(e as AxiosError));
        }
    }

    return <div>
        <b>Change Name</b>
        <table>
        <tbody>
        <tr>
            <td>
                Name {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
            </td>   
            <td>
                <input defaultValue={userInfo.name} onChange={(e) => setNewName(e.target.value)}/>
            </td>
        </tr>
        </tbody>
        </table>

        <label className="errorLabel">{errorLabel}</label>
        <label className="successLabel">{successLabel}</label> 
        <br />

        <button onClick={() => saveName()} className="largeButton">Save Name</button>
    </div>
}

const DeleteAccount = () => {
    
    
    const [errorLabel, setErrorLabel] = useState("");
    const [successLabel, setSuccessLabel] = useState("");

    const [pw, setPw] = useState("");

    async function deleteAccount() {

        async function run() {
            try {
                await Account.delete(pw);
                setSuccessLabel("Account Deleted");
                setErrorLabel("");
                setTimeout(() => {window.location.href = "/"}, 1000);
            } catch (e) {
                setErrorLabel(axiosService.errorToString(e as AxiosError));
            }
        }

        alertService.confirm("Delete Account", "Are you sure you would like to delete your account?", () => run());
    }

    return <div>
        <b>Delete Account</b> <br />
        Password: <input onChange={(e) => setPw(e.target.value)} type="password"/> <br />
        <label className="errorLabel">{errorLabel}</label>
        <label className="successLabel">{successLabel}</label> 
        <br />
        <button onClick={() => deleteAccount()} className="largeButton">Delete</button>
    </div>
}

export default function ProfilePage() {

    const [userInfo, setUserInfo] = useState<User>({} as User);
    const [def_userInfo, setDef_UserInfo] = useState<User>({} as User);

    useEffect(() => {
        const init = async() => {
            let accountInfo = (await Account.getUserInfo())["response"];
            setUserInfo(accountInfo);
            setDef_UserInfo(accountInfo);
        }
        init();
    }, [])

    return <div className="profileDiv">
        <b>{userInfo.name}</b> <br />
        <hr />
        <ChangeName userInfo={userInfo} />
        <hr />
        <ChangeEmail userInfo={userInfo} />
        <hr />
        <ChangePassword userInfo={userInfo} />
        <hr />
        <DeleteAccount />
    </div>
}