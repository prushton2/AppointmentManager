import "./Profile.css"
import "../../App.css"
import { useEffect, useState } from "react";
import { Account } from "../../lib/ajax";
import User from "../../models/User";

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
            setErrorLabel("Password Not Changed");
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
                <input onChange={(e) => setChk(e.target.value)} type="password"/> <br />
            </td>
        </tr>
        </tbody>
        </table>
        <label className="errorLabel">{errorLabel}</label>
        <label className="successLabel">{successLabel}</label> <br />
        <button className="largeButton" onClick={() => {ChangePassword()}}>Change</button>
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
        <ChangePassword userInfo={userInfo}/>
    </div>
}