import "../App.css"
import "./Header.css"
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import { useEffect, useState } from "react";
import {Account} from "../lib/ajax"
import { TabPanelInfo } from "../models/TabPanelInfo";

import Users from "./Account/Users";

export default function AccountPage() {

    const [selectedTab, setSelectedTab] = useState(0);
    
    const [tabTitles, setTabTitles] = useState<JSX.Element[]>([<Tab key={0}/>, <Tab key={1}/>, <Tab key={2}/>, <Tab key={3}/>, <Tab key={4}/>]);
    const [tabPanels, setTabPanels] = useState<JSX.Element[]>([<TabPanel key={0}/>, <TabPanel key={1}/>, <TabPanel key={2}/>, <TabPanel key={3}/>, <TabPanel key={4}/>]);

    const allTabs: TabPanelInfo[] = [
        {
            name: "My Profile",
            JSX: <a>My Profile</a>,
            permission: "permissions.self"
        },
        {
            name: "My Appointments",
            JSX: <a>My Appointments</a>,
            permission: "permissions.self"
        },
        {
            name: "Slots",
            JSX: <a>Slots</a>,
            permission: "permissions.slots"
        },
        {
            name: "Appointment Page",
            JSX: <a>Appointment Page</a>,
            permission: "permissions.appointments"
        },
        {
            name: "Users & Permissions",
            JSX: <Users />,
            permission: "permissions.users"
        },
    ]

    const logout = async() => {
        await Account.Logout();
        window.location.href="/";
    }

    useEffect(() => { //get the allowed tabs
        
        const init = async() => {
            let user = await Account.getUserInfo();
        
            let   viewableTabs: JSX.Element[] = [];
            let viewablePanels: JSX.Element[] = [];
            
            for(let i in allTabs) {
                for(let j in user.response.permissions) {
                    if(user.response.permissions[j].startsWith(allTabs[i].permission) || user.response.permissions[j] === "permissions.*") {
                        viewableTabs[i] = (<Tab key={i}>{allTabs[i].name}</Tab>);
                        viewablePanels[i] = (<TabPanel key={i}>{allTabs[i].JSX}</TabPanel>);
                        continue;
                    }
                }
            }

            setTabTitles(viewableTabs);
            setTabPanels(viewablePanels);
        }
        init();
    }, [])


    return <div className="header">
        <button className="largeButton" style={{position: 'absolute', top: "10px", right: "10px", fontSize: "12px"}} onClick={() => {logout()}}> {"Log Out"} </button>
        <h1 onClick={() => {window.location.href="/"}}>
            Appointment Manager
            <div style={{position: 'absolute', top: "10px", left: "10px", fontSize: "24px"}}> {"<-"} </div>
        </h1>

        <Tabs selectedIndex={selectedTab} onSelect={(i) => setSelectedTab(i)}>
            <TabList>
                {tabTitles}
            </TabList>

            {tabPanels}
        </Tabs>
    </div>
}


