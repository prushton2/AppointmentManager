import "./Header.css"
import { useEffect, useState } from "react";


export default function Account() {



    return <div className="header">
        <h1 style={{borderBottom: "1px solid #38343c"}} onClick={() => {window.location.href="/"}}>Appointment Manager <br /><br /></h1>
    </div>
}


