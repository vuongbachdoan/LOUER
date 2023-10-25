import axios from "axios";


const requestZ = axios.create({
    baseURL: 'https://www.louerapp.com/api/',
    // timeout: 1000,
    headers: {
        // 'X-Custom-Header': 'foobar',
        // 'ngrok-skip-browser-warning': 'true' // Set the header with any value you want
    }
});



export const getBaseLink = async () => {
    return requestZ.baseURL;
};


export const get = async (path, options = {}) => {
    const res = await requestZ.get(path, options);
    return res.data;
};

export const put = async (path, data) => {
    const res = await requestZ.put(path, data);
    return res.data;
};

export const del = async (path) => {
    const res = await requestZ.delete(path);
    return res.data;
};

export const post = async (path, data) => {
    const json = JSON.stringify(data);
    const res = await requestZ.post(path, json);
    return res.data;
}

export const createRequest = async (userId, data) => {
    const res = await axios.post(`https://www.louerapp.com/api/listings/add?userId=${userId}`, JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    return res.data
}

export const uploadImage = async (listingId, dataImg) => {
    const FormData = require('form-data');
    const data = new FormData();
    data.append('images', dataImg);
    const res = await axios.post(`https://www.louerapp.com/api/images/listings/upload?listingId=${listingId}`, data);
    return(res.status);
}

export default requestZ;