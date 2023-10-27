import React, { useState, useEffect } from "react";
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

// export const uploadImage = async (listingId, dataImg) => {
//     var formdata = new FormData();
//     formdata.append("images", dataImg);

//     var requestOptions = {
//         method: 'POST',
//         body: formdata,
//     };

//     // fetch(`https://www.louerapp.com/api/images/listings/upload?listingId=${listingId}`, requestOptions)
//     fetch(`https://www.louerapp.com/api/images/listings/upload?listingId=119`, requestOptions)
//         .then(response => {
//             console.log('Img upload response:',JSON.stringify(response.status));
//             console.log('response:',JSON.stringify(response.toString));
//             return response;
//         })
//         .then(result => {
//             console.log('Img upload result:',JSON.stringify(result));
//             return result;
//         })
//         .catch(error => {
//             console.log('error', JSON.stringify(error));
//         });
// }




export const uploadImage = async (listingId, images) => {

    let formData = new FormData();
    images.forEach((image) => {
        formData.append("images", {
            file: image,
            type: 'image/jpeg',
            // type: 'multipart',
        });
        
    });   
    
    let header = {
        'Content-Type': "multipart/form-data",
    };
    let request = {
        method: 'POST',
        headers: header,
        body: formData,
    };
    fetch(`https://www.louerapp.com/api/images/listings/upload?listingId=${listingId}`, request)
        .then(response => {
            console.log('Img upload response:',JSON.stringify(response));
            console.log('response:',JSON.stringify(response.toString));
            return response.status;
        })
        .then(result => {
            console.log('Img upload result:',JSON.stringify(result));
            return result.status;
        })
        .catch(error => {
            console.log('error UPLOAD IMG', error);
        });
}

export default requestZ;