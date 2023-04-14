import "./Services.css"

import { useEffect, useState } from "react";
import {Service, ServiceWithoutID} from "../../models/Service";
import { Services } from "../../lib/ajax";
import { alertService, axiosService } from "../../lib/utils";
import { AxiosError } from "axios";
import { ToastsStore } from "react-toasts";

const ServiceElement = ({service, index}: {service: Service, index: number}) => {

    const [currentService, setCurrentService] = useState(structuredClone(service));
    const [defaultService, setDefaultService] = useState(structuredClone(service));
    
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        setIsChanged(JSON.stringify(currentService)!==JSON.stringify(defaultService))
    }, [currentService, defaultService])

    let positionMap = ["left", "middle", "right"]

    function Delete(id: string) {
        async function run(id: string) {
            try {
                await Services.delete(id);
                alertService.alert("Service Deleted", "Service Deleted");
            } catch (e) {
                alertService.fail("Service Not Deleted", axiosService.errorToString(e as AxiosError))
            }
        }

        alertService.confirm("Delete", "Confirm Deletion of Service", () => run(id));
    }

    function modify(id: string, props: ServiceWithoutID) {
        async function run(id: string, props: ServiceWithoutID) {
            try {
                await Services.modify(id, props);
                ToastsStore.success("Service Modified");
                setDefaultService(currentService);
            } catch (e) {
                alertService.fail("Service Not Modified", axiosService.errorToString(e as AxiosError))
            }
        }
        run(id, props)
    }

    return <div className={`serviceBox ${positionMap[index%3]}`} style={{top: `${3.5+15*(Math.floor(index/3))}em`}}>
        <b>{service.name}</b> (ID: {service.id}) <br />
        <br />
        <table>
        <tbody>
        <tr>
            <td>Name</td>
            <td><input onChange={(e) => setCurrentService({...currentService, name: e.target.value})} defaultValue={service.name}/></td>
        </tr>
        <tr>
            <td>Description</td>
            <td><input onChange={(e) => setCurrentService({...currentService, description: e.target.value})} defaultValue={service.description}/></td>
        </tr>
        <tr>
            <td>Price</td>
            <td><input onChange={(e) => setCurrentService({...currentService, price: parseInt(e.target.value)})} defaultValue={service.price} type="number" /></td>
        </tr>
        <tr>
            <td>Rate</td>
            <td>
                <select onChange={(e) => setCurrentService({...currentService, rate: e.target.value})} defaultValue={service.rate}>
                    <option value="hourly">Hourly</option>
                    <option value="fixed">Fixed</option>
                </select>
            </td>
        </tr>
        <tr>
            <td></td>
            <td><button onClick={() => Delete(service.id)}>Delete</button></td>
        </tr>
        </tbody>
        </table>
        <br />
        <button className={`saveBtn ${isChanged ? "" : "disabled"}`} onClick={() => modify(service.id, currentService as ServiceWithoutID)}>Save</button>
    </div>
}

const CreateService = ({} : {}) => {

    const [currentService, setCurrentService] = useState({} as ServiceWithoutID);

    async function Create(service: ServiceWithoutID) {
        try {
            await Services.create(service);
            ToastsStore.success("Service Created");
        } catch (e) {
            axiosService.errorToString(e as AxiosError);
        }

    }

    return <div className={`serviceBox createService`} style={{top: `3.5em`}}>
        <b>Create Service</b><br />
        <br />
        <table>
        <tbody>
        <tr>
            <td>Name</td>
            <td><input onChange={(e) => setCurrentService({...currentService, name: e.target.value})}/></td>
        </tr>
        <tr>
            <td>Description</td>
            <td><input onChange={(e) => setCurrentService({...currentService, description: e.target.value})}/></td>
        </tr>
        <tr>
            <td>Price</td>
            <td><input onChange={(e) => setCurrentService({...currentService, price: parseInt(e.target.value)})} type="number" /></td>
        </tr>
        <tr>
            <td>Rate</td>
            <td>
                <select onChange={(e) => setCurrentService({...currentService, rate: e.target.value})}>
                    <option value="hourly">Hourly</option>
                    <option value="fixed">Fixed</option>
                </select>
            </td>
        </tr>
        <tr>
            <td></td>
            <td><button className="largeButton" onClick={() => Create(currentService)}>Create</button></td>
        </tr>
        </tbody>
        </table>
        <br />
    </div>
}


export default function ServicesPage() {

    const [services, setServices] = useState<Service[]>([]);
    const [servicesHTML, setServicesHTML] = useState<JSX.Element[]>([]);
    
    const [searchString, setSearchString] = useState<string>("");
    const [searchParam, setSearchParam] = useState<string>("name");

    function getSearchParam(v: Service) {
        switch(searchParam) {
            case "rate":
                return structuredClone(v).rate;
            case "description":
                return structuredClone(v).description;
            default:
                return structuredClone(v).name;
        }
    }

    useEffect(() => {
        const init = async() => {
            setServices((await Services.getAll())["response"]);
        }
        init();
    }, [])

    useEffect(() => {
        let newServicesHTML: JSX.Element[] = [];
        
        let filteredServices: Service[] = services.filter((v: Service) => {return getSearchParam(v).toLowerCase().indexOf(searchString.toLowerCase()) !== -1})
        
        for(let i = 0; i<filteredServices.length; i++) {
            let v = filteredServices[i];
            newServicesHTML[i] = <ServiceElement service={v} index={i} key={i} />
        }

        if(JSON.stringify(servicesHTML) !== JSON.stringify(newServicesHTML)) {
            setServicesHTML(newServicesHTML);
        }
    }, [services, servicesHTML])

    useEffect(() => {
        setServicesHTML([]);
    }, [searchParam, searchString])

    return <div style={{position: "relative"}}>
        <br />
        
        <select onChange={(e) => setSearchParam(e.target.value)}>
            <option value="name">Name</option>
            <option value="description">Description</option>
            <option value="rate">Rate</option>
        </select>
        {'\u00A0'}{'\u00A0'}

        <input className="searchBox" placeholder="Search..." onChange={(e) => setSearchString(e.target.value)}/>
        <br />
        <CreateService />
        {servicesHTML}
    </div>

}