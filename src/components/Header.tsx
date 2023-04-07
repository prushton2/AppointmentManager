import "./Header.css"

import { useEffect, useState } from "react";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';

import MakeAppointment from "./MakeAppointment"
import LoginRedirect from "./LoginRedirect"

export default function Header() {

    const [selectedTab, setSelectedTab] = useState(0);

    return <div className="header">
        <h1>Appointment Manager</h1>
        <Tabs selectedIndex={selectedTab} onSelect={(i) => setSelectedTab(i)}>
            <TabList>
                <Tab>Home</Tab>
                <Tab>Make Appointment</Tab>
                <Tab>Account</Tab>
            </TabList>

            <TabPanel><a>Home</a></TabPanel>
            <TabPanel><MakeAppointment /></TabPanel>
            <TabPanel><LoginRedirect /></TabPanel>
        </Tabs>
    </div>;
}