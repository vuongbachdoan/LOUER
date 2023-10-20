import *  as request from "../utils/request";



const getAllByProductId = async (productId) => {
    try {
        const res = await request.get(`/listings/product?productId=${productId}`);
        return res.data; 
    } catch (error) {
        outputError(error);
    }
};

const getAllByUserId = async (userId) => {
    try {
        const res = await request.get(`/listings/user?userId=${userId}`);
        return res.data; 
    } catch (error) {
        outputError(error);
    }
};

const getById = async (listingId) => {
    try {
        const res = await request.get(`/listings?listingId=${listingId}`);
        return res.data; 
    } catch (error) {
        outputError(error);
    }
};

const getImgById = async (listingId) => {
    try {
        const res = await request.get(`/images/listings?listing_id=${listingId}`);
        return res.data; 
    } catch (error) {
        outputError(error);
    }
};

const add = async (userId, data) => {
    // data: productName, brandName, categoryName, listingDescription, marketPrice, price
    try {
        const res = await request.post(`/listings/add?userId=${userId}`, data);
        return res.data; 
    } catch (error) {
        outputError(error);
    }
};

const addImg = async (listingId, data) => {
    try {
        const res = await request.post(`/images/listings/upload?listing_id=${listingId}`, data);
        return res.data; 
    } catch (error) {
        outputError(error);
    }
};


const update = async (listingId, data) => {
    // data = productName, brandName, categoryName, listingDescription, marketPrice, price
    try {
        const res = await request.put(`/listings/update?listingId=${listingId}`, data);
        return res.data; 
    } catch (error) {
        outputError(error);
    }
};

const remove= async (listingId) => {
    try {
        const res = await request.delete(`/listings/remove?listingId=${listingId}`);
        return res.data; 
    } catch (error) {
        outputError(error);
    }
};

const outputError = (error) => {
    return console.error(error);
}
