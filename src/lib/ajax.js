import axios from 'axios';

export const Account = {
    Login: async (name, pass) => {
        let response = axios.post(`${process.env.REACT_APP_BACKEND_URL}/account/login`, {name: name, pass: pass});
        return (await response).data;
    }
}