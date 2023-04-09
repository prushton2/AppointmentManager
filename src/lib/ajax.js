import axios from 'axios';

const cookieConfig = {withCredentials: true};


export const Account = {
    Login: async (name, pass) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/account/login`
        const body = {"name": name, "pass": pass}
        
        const response = await axios.post(url, body, cookieConfig);
        return (response.data);   
    },

    getUserInfo: async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/account/myInfo`
        
        const response = await axios.get(url, cookieConfig);
        return (response.data);
    }
}