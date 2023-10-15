import axios from "axios";


const requestZ = axios.create({
    baseURL: 'http://www.louerapp.com/api/',
    timeout: 1000,
    headers: {
        // 'X-Custom-Header': 'foobar',
        // 'ngrok-skip-browser-warning': 'true' // Set the header with any value you want
    }
});


export const get = async(path, options ={} ) => {
    const res = await requestZ.get(path, options);
    return res.data; 
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