import axios from 'axios';

const cookieConfig = {withCredentials: true};


export const Account = {
    Login: async (name, pass) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/account/login`;
        const body = {"name": name, "pass": pass};
        
        const response = await axios.post(url, body, cookieConfig);
        return (response.data);   
    },

    getUserInfo: async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/account/myInfo`;
        
        const response = await axios.get(url, cookieConfig);
        return (response.data);
    },

    Logout: async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/account/logout`;
        
        const response = await axios.get(url, cookieConfig);
        return (response.data);
    },

    ChangePassword: async (oldPassword, newPassword) => {    
        const url = `${process.env.REACT_APP_BACKEND_URL}/account/changePassword`;
        const body = {oldPassword: oldPassword, newPassword: newPassword};
        
        const response = await axios.post(url, body, cookieConfig);
        return (response.data);
    },

    changeProp: async (prop, value) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/account/changeProp`;
        const body = {prop: prop, value: value};
        
        const response = await axios.patch(url, body, cookieConfig);
        return (response.data);
    },

    delete: async (password) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/account/delete`;
        const body = {password: password};
        
        const response = await axios.post(url, body, cookieConfig);
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
        const url = `${process.env.REACT_APP_BACKEND_URL}/users/setUser`;
        const body = {id: id, newProps: newProps}

        const response = await axios.patch(url, body, cookieConfig);
        return response.data;
    },

    createUser: async(info) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/users/createUser`;
        const body = info;

        const response = await axios.post(url, body, cookieConfig);
        return response.data;
    },

    resetPassword: async(id) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/users/resetPassword`;
        const body = {id: id};

        const response = await axios.patch(url, body, cookieConfig);
        return response.data;
    },

    delete: async(id) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/users/delete`;
        const body = {id: id};

        const response = await axios.post(url, body, cookieConfig);
        return response.data;
    }
}