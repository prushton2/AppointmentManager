import { useEffect, useState } from "react";
import Slot from "../../models/Service";
import { Services } from "../../lib/ajax";


const SlotElement = ({}: {}) => {}

export default function SlotsPage() {

    const [services, setServices] = useState<Slot[]>([]);
    const [slotsHTML, setSlotsHTML] = useState<JSX.Element[]>([]);
    
    const [searchString, setSearchString] = useState<string>("");
    const [searchParam, setSearchParam] = useState<string>("name");

    useEffect(() => {
        const init = async() => {
            setServices(await Services.getAll());
        }
        init();
    }, [])

    return <div style={{position: "relative"}}>
        <br />
        
        <select onChange={(e) => setSearchParam(e.target.value)}>
            <option value="name">Name</option>
            <option value="description">description</option>
            <option value="price">price</option>
        </select>
        {'\u00A0'}{'\u00A0'}

        <input className="searchBox" placeholder="Search..." onChange={(e) => setSearchString(e.target.value)}/>
        <br />
        {/* <CreateUser /> */}
        {slotsHTML}
    </div>

}