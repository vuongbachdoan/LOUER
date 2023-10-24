import axios from "axios";

const requestZ = axios.create({
    baseURL: 'https://www.louerapp.com/api/',
    timeout: 1000,
    headers: {
        // 'X-Custom-Header': 'foobar',
        // 'ngrok-skip-browser-warning': 'true' // Set the header with any value you want
    }
});

export const getBaseLink = async( ) => {
    return requestZ.baseURL; 
};

export const mail = async (firstName, email, avaLink, lastName = '', middleName = '') => {
    const json = {
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        email: email,
        picture: avaLink
    };
    const res = await requestZ.post('users/signIn', json);
    return res.data;
};

export const mailFPT = async (fullname, email, avaLink) => {
    const json = {
        name: fullname,
        email: email,
        picture: avaLink
    };
    const res = await requestZ.post('users/FPT/signIn', json);
    // console.log('MAIL FPT SIGNIN:',res.data);
    return res.data;
};

export const mailOther = async (fullname, email, avaLink) => {
    const json = {
        name: fullname,
        email: email,
        picture: avaLink
    };
    const res = await requestZ.post('users/signIn', json);
    return res.data;
};


export default requestZ;