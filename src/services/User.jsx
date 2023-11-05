import * as request from "../utils/request";
import * as LoginService from "./UserLogin";
import * as BankService from "./UserBank";
import { store } from "../state/store";
import React, {useState} from 'react';
import axios from "axios";
import * as Toast from "../components/Toast";


const requestUpdate = axios.create({
    baseURL: 'https://www.louerapp.com/api/',
    // timeout: 1000,
    headers: {
        "Content-Type": "application/json"
    }
});

export const getById = async (userId) => {
    try {
        const res = await request.get(`users/${userId}`);
        return res;
    } catch (error) {
        outputError(error);
    }
};

export const getAvaLinkById = async (userId) => {
    try {
        return request.getBaseLink() + `images/users/${userId}`;
    } catch (error) {
        outputError(error);
    }
};
export const getAvaById = async (userId) => {
    try {
        const res = await request.get(`images/users/${userId}`)
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

export const getDataById = async (userId) => {
    try {
        const userRes = await getById(userId);
        const imgRes = await getAvaLinkById(userId);
        return { user: userRes.data, img: imgRes };
    } catch (error) {
        outputError(error);
    }
};


export const addImgById = async (userId, imgLink) => {
    try {
        const res = await request.post('images/users', {
            params: {
                user_id: userId,
            }
        })
        return res.data;
    } catch (error) {
        outputError(error);
    }
};


export const updateImgById = async (userId) => {
    try {
        const res = await request.post('images/users/', {
            params: {
                user_id: userId,

            }
        })
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

export const deleteImgById = async (userId, data) => {
    try {
        const res = await request.del(`images/users?user_id=${userId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};


export const updateModeById = async (userId) => {
    try {
        const res = await request.put(`users/switchUserMode?userId=${userId}`);
        return res;
    } catch (error) {
        outputError(error);
    }
};



export const updateDataFPT = async (userId, data) => {
    let resLogin;
    let resBank;
    let json = {
        phone: data.phone,
    }

    resLogin = (await requestUpdate.put(`users/update?userId=${userId}`, json)).data;
    console.log('FPT MAIL UPDATE RES', resLogin);
    
    //Bank Information
    if (data.bankName !== null || data.cardName !== null || data.cardNumber !== null) {
        resBank = updateDataBank(data);
        console.log('FPT BANK UPDATE RES', resBank);
    }

    

    if (resLogin) {
        handleUpdateState(resBank, resLogin);
        return true;
    } else {
        Toast.show('Cập nhật thông tin thất bại, vui lòng thử lại sau');
        return false;
    }

}


export const updateDataGmail = async (userId, data) => {
    let resLogin;
    let resBank;
    let json = {
        studentId: data.studentId,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        phone: data.phone,
    }
    resLogin = await requestUpdate.put(`users/update?userId=${userId}`, json);
        console.log('UPDATE DATA RES', resLogin);


    //Bank Information
    if (data.bankName !== null || data.cardName !== null || data.cardNumber !== null) {
        resBank = updateDataBank(data);
        console.log('BANK UPDATE RES', resBank);
    }


    if (resLogin) {
        handleUpdateState(resBank, resLogin);
        Toast.show('Cập nhật thông tin thành công');
        return true;
    } else {
        Toast.show('Cập nhật thông tin thất bại, vui lòng thử lại sau');
        return false;
    }


}

export const updateDataBank = async (data) => {
    console.log('Going to update bank');
    let user = useState((state) => state.user)[0];
    let resBank;
    let jsonData = {
        userId: data.userId,
        bankName: data.bankName,
        cardNumber: data.cardNumber,
        cardName: data.cardName
    }
    if (user.bankName === null && user.cardName === null && user.cardNumber === null) {
        console.log('Going to add bank');
        resBank = await requestUpdate.post(`bankCreds/add`, JSON.parse(jsonData));
    } else {
        console.log('Going to update bank');
        resBank = (await requestUpdate.put(`bankCreds/update`, JSON.parse(jsonData))).data;
    }
    console.log('UPDATE BANK RES', resBank);
    return resBank;
}

export const handleGetData = async (fullName, firstName, email, avaLink, lastName = '', middleName = '') => {
    let resLogin;
    let resBank;

    switch (true) {
        //Case FPT
        case /[a-z0-9]{8,}@fpt\.edu\.vn/.test(email):
            resLogin = await LoginService.mailFPT(fullName, email, avaLink);
            break;
        //Case Gmail
        case /^[a-z0-9]{8,}@gmail\.com$/.test(email):
            if (user.lastName !== null && middleName === null) {
                resLogin = await LoginService.mail(fullName, email, avaLink, lastName);
            } else if (middleName !== null && lastName === null) {
                resLogin = await LoginService.mail(fullName, email, avaLink, null, middleName)
            } else if (lastName !== null && middleName !== null) {
                resLogin = await LoginService.mail(fullName, email, avaLink, lastName, middleName)
            }
            break;
        //Case Other Mail
        default:
            resLogin = await LoginService.mailOther(fullName, email, avaLink);
            break;
    }

    resBank = await BankService.getById(resLogin.userId);
    handleUpdateState(resBank, resLogin);
}

const handleUpdateState = (resBank, resLogin) => {
    store.update(s => {
        s.user.userId = resLogin.userId;
        s.user.images = resLogin.images;

        s.user.studentId = resLogin.studentId;
        s.user.firstName = resLogin.firstName;
        s.user.lastName = resLogin.lastName;
        s.user.middleName = resLogin.middleName;

        s.user.email = resLogin.email;
        s.user.phone = resLogin.phone;

        s.user.positiveRating = resLogin.positiveRating;
        s.user.negativeRating = resLogin.negativeRating;
        s.user.rating = resLogin.rating;

        s.user.userStatus = resLogin.userStatus;
        s.user.userMode = resLogin.userMode;
        
        if (resBank || resBank !== undefined) {
            s.user.bankName = resBank.bankName;
            s.user.cardName = resBank.cardName;
            s.user.cardNumber = resBank.cardNumber;
        }
    });
}





const outputError = (error) => {
    Toast.show('Úi, lỗi mạng, mong bạn mở lại Louer nhé ><');
    return console.error(error);
}
