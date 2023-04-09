import axios from 'axios';

export const Account = {
    Login: async (name, pass) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/account/login`
        const body = {"name": name, "pass": pass}
        const config = {}
        
        const response = await axios.post(url, body, config);
        return response.data;   
    }
}