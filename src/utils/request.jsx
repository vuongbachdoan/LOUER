import axios from "axios";


const requestZ = axios.create({
    baseURL: 'http://www.louerapp.com/api/',
    timeout: 1000,
    headers: {
    }
});


export const get = async(path, options = {}) => {
    return requestZ.get(path, options)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
};

export const put = async(path, data) => {
    const res = await requestZ.put(path, data);
    return res.status;
};

export const del = async(path) => {
    const res = await requestZ.delete(path);
    return res.status;
};

export const post = async(path, data) => { 
    const res  = await requestZ.post(path, data);
    return res.status;
}






export default requestZ;