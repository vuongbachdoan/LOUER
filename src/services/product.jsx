import * as request from "../utils/request";


export const getAllByPage = async (page, size) => {
    try {
        const res = await request.get(`products?page=${page}&size=${size}`);
        return res; 
    } catch (error) {
        outputError(error);
    }

};

export const getImgByProductId = async (productId) => {
    try {
        const res = await request.get(`/mages/products?product_id=${productId}`);
        return res; 
    } catch (error) {
        outputError(error);
    }

};

export const UploadImgByProductId = async (productId, data) => {
    try {
        const res = await request.get(`images/products?product_id=${productId}`);
        return res; 
    } catch (error) {
        outputError(error);
    }

};


const outputError = (error) => {
    return console.error(error);
}
