import axios from "axios";


const request = axios.create({
    baseURL: 'https://www.louerapp.com/',
    timeout: 1000,
    headers: {
        // 'X-Custom-Header': 'foobar',
        'ngrok-skip-browser-warning': 'true' // Set the header with any value you want
    }
});


export const get = async(path, options ={} ) => {
    const res = await request.get(path, options);
    return res.data; 
};

export const put = async(path, data) => {
    const res = await request.put(path, data);
    return res.status;
};

export const del = async(path) => {
    const res = await request.delete(path);
    return res.status;
};

export const post = async(path, data) => { 
    const res  = await request.post(path, data);
    return res.status;
}






export default request;