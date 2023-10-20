import * as request from "../utils/request";


const getAllByPage = async (page, size) => {
    try {
        const res = await request.get(`/products?page=${page}&size=${size}`);
        return res.data; 
    } catch (error) {
        outputError(error);
    }

};

const getImgByProductId = async (productId) => {
    try {
        const res = await request.get(`/images/products?product_id=${productId}`);
        return res.data; 
    } catch (error) {
        outputError(error);
    }

};

const UploadImgByProductId = async (productId, data) => {
    try {
        const res = await request.get(`/images/products?product_id=${productId}`);
        return res.data; 
    } catch (error) {
        outputError(error);
    }

};


const outputError = (error) => {
    return console.error(error);
}
