import axios from "axios";
import Toast from '../components/Toast';
const requestZ = axios.create({
    baseURL: 'https://www.louerapp.com/api/',
    timeout: 1000
});

export const getBaseLink = async () => {
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

    try {
        const res = await requestZ.post('users/signIn', json);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

export const mailFPT = async (fullname, email, avaLink) => {
    const json = {
        name: fullname,
        email: email,
        picture: avaLink
    };
    try {
        const res = await requestZ.post('users/FPT/signIn', json);
        return res.data;
    } catch (error) {
        outputError(error);

    };
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



    const outputError = (error) => {
        Toast.show('Úi, lỗi đăng nhập, mong bạn mở lại Louer nhé ><');
        return console.error(error);
    }




    export default requestZ;