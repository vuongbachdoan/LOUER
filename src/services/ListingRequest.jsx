import *  as request from "../utils/request";
import axios from "axios";


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

export const add = async (userId, data) => {
    // data: productName, brandName, categoryName, listingDescription, marketPrice, price
    try {
        const res = await request.post(`listings/add?userId=${userId}`, JSON.stringify(data));
        return res.data; 
    } catch (error) {
        outputError(error);
    }
};

export const createRequest = async (userId, data) => {
    const res = await axios.post(`https://www.louerapp.com/api/listings/add?userId=${userId}`, JSON.stringify(data)
    // ,{
    //     headers: {
    //         "Content-Type": "application/json; charset=UTF-8"
    //     }
    // }
    )
    return res.data
}

export const addImg = async (listingId, data) => {
    try {
        const res = await request.post(`images/listings/upload?listing_id=${listingId}`, data);
        return res.data; 
    } catch (error) {
        outputError(error);
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

const remove= async (listingId) => {
    try {
        const res = await request.delete(`listings/remove?listingId=${listingId}`);
        return res.data; 
    } catch (error) {
        outputError(error);
    }
};

const outputError = (error) => {
    return console.error(error);
}
