import axios from "axios";
import *  as request from "../utils/request";
import * as Toast from "../components/Toast";


const getAllByProductId = async (productId) => {
    try {
        const res = await request.get(`listings/product?productId=${productId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

const getAllByUserId = async (userId) => {
    try {
        const res = await request.get(`listings/user?userId=${userId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

const getById = async (listingId) => {
    try {
        const res = await request.get(`listings?listingId=${listingId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

const getImgById = async (listingId) => {
    try {
        const res = await request.get(`images/listings?listing_id=${listingId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};


export const createRequest = async (userId, data) => {
    axios.post(`https://www.louerapp.com/api/listings/add?userId=${userId}`, JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }).then(async (res) => {
        return res;
    })
}

export const addImg = async (listingId, images) => {
    let formData = new FormData();
    if (images) {
        images.forEach((image) => {
            // formData.append('images', { uri: image.uri });
            formData.append('images', { uri: image.data });
        });
    }
    let header = {
        'Content-Type': "multipart/form-data; boundary=" + formData._boundary,
        // 'Content-Type': "multipart/form-data",
    };
    let request = {
        method: 'POST',
        headers: header,
        body: formData,
    };

    let config = {
        headers: header,
        transformRequest: [() => {
            return formData;
        }]
    };
    console.log('request', request);
    try {
        // const response = await fetch(`https://www.louerapp.com/api/images/listings/upload?listingId=${listingId}`, JSON.stringify(request));
        const response = await axios.post(`https://www.louerapp.com/api/images/listings/upload?listingId=${listingId}`, config);
        console.log('Img upload response:', JSON.stringify(response));
        return response;
    } catch (error) {
        console.log('error UPLOAD IMG', error);
    }
};





const update = async (listingId, data) => {
    // data = productName, brandName, categoryName, listingDescription, marketPrice, price
    try {
        const res = await request.put(`listings/update?listingId=${listingId}`, data);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

const remove = async (listingId) => {
    try {
        const res = await request.delete(`listings/remove?listingId=${listingId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

const outputError = (error) => {
    Toast.show('Úi, lỗi mạng, mong bạn mở lại Louer nhé ><');
    Toast.show(error.message);
}
