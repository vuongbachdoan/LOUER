import * as request from "../utils/request";



const getByProductId = async (productId) => {
    try {
        const res = await request.get(`/listings?productId=${productId}`);
        return res.data; 
    } catch (error) {
        outputError(error);
    }
};

const getByUserId = async (userId) => {
    try {
        const res = await request.get(`/users/${userId}/listings`);
        return res.data; 
    } catch (error) {
        outputError(error);
    }

};

const getById = async (listingId) => {
    try {
        const res = await request.get(`/images/listings?listing_id=${listingId}`);
        return res.data; 
    } catch (error) {
        outputError(error);
    }

};

const updateById = async (data) => {
    try {
        const res = await request.post(`/listings`, data);
        return res.data; 
    } catch (error) {
        outputError(error);
    }

};

const add = async (data) => {
    try {
        const res = await request.post(`/listings`, data);
        return res.data; 
    } catch (error) {
        outputError(error);
    }

};




const outputError = (error) => {
    return console.error(error);
}
