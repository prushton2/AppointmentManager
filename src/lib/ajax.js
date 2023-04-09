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
    },

    Logout: async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/account/logout`
        
        const response = await axios.get(url, cookieConfig);
        return (response.data);
    }
}

export const Users = {
    getUsers: async() => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/users/get`
        
        const response = await axios.get(url, cookieConfig);
        return response.data;
    },

    setUser: async(id, newProps) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/users/set`;
        const body = {id: id, newProps: newProps}

        const response = await axios.patch(url, body, cookieConfig);
        return response.data;
    }
}