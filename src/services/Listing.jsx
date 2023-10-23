import * as request from "../utils/request";
import {store} from "../state/store";



export const getByProductId = async (productId) => {
    try {
        const res = await request.get(`/listings/product?productId=${productId}`);
        return res; 
    } catch (error) {
        outputError(error);
    }
};

export const getByUserId = async (userId) => {
    try {
        const res = await request.get(`/listings/user?userId=${userId}`);
        return res; 
    } catch (error) {
        outputError(error);
    }

};

export const getById = async (listingId) => {
    try {
        const res = await request.get(`/listings?listing_id=${listingId}`);
        return res; 
    } catch (error) {
        outputError(error);
    }

};

export const getImgById = async (listingId) => {
    try {
        const res = await request.get(`/images/listings?listing_id=${listingId}`);
        return res; 
    } catch (error) {
        outputError(error);
    }
}

export const updateById = async (data) => {
    try {

        const res = await request.post(`/listings`, data);
        return res; 
    } catch (error) {
        outputError(error);
    }

};

export const add = async (userId, data) => {
    try {
        const res = await request.post(`/listings/add?userId=${userId}`, data);
        return res; 
    } catch (error) {
        outputError(error);
    }

};



const outputError = (error) => {
    return console.error(error);
}
