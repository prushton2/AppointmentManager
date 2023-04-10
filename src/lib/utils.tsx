import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "./utils.css"
import { AxiosError } from 'axios';

export const alertService = {
    rawConfirmBox: (title: string, message: string, option1Label: string, option1Fn: () => any, option2Label: string, option2Fn: () => any) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return <div className="alertBox">
                    <h2>{title}</h2>
                    <div className="alertMessageLabel">{message}</div>
                    <button onClick={() => {option1Fn(); onClose()}} className='alertButton Left'>{option1Label}</button>
                    <button onClick={() => {option2Fn(); onClose()}} className='alertButton Right'>{option2Label}</button>
                </div>
            } 
        })
    },
    confirm: (title: string, message: string, onConfirm: () => any) => {
        alertService.rawConfirmBox(title, message, "Yes", onConfirm, "No", () => {});
    },
    alert: (title: string, message: string) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return <div className="alertBox">
                    <h2>{title}</h2>
                    <div className="alertMessageLabel">{message}</div>
                    <button onClick={() => {onClose()}} className='alertButton Center'>Ok</button>
                </div>
            } 
        })
    },
    fail: (event: string, reason: string) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return <div className="alertBox">
                    <h2>{event}</h2>
                    <div className="alertMessageLabel">{reason}</div>
                    <button onClick={() => {onClose()}} className='alertButton Center'>Ok</button>
                </div>
            } 
        })
    }
}

export const axiosService = {
    errorToString: (e: AxiosError) => {
        return (((e as AxiosError).response?.data) as Object)["response" as keyof Object].toString();
    }
}
//: { onclose: ((this: Window, ev: Event) => any) | null })