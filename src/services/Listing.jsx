import * as request from "../utils/request";


import {store} from "../state/store";


function transformApiResponse(apiResponse) {
    return apiResponse.map((listing) => {
        return {
            listingId: listing.listingId,
            product: {
                productId: listing.product.productId,
                productName: listing.product.productName,
                brand: listing.product.brand,
                category: listing.product.category,
                numberOfListings: listing.product.numberOfListings,
                marketPrice: listing.product.marketPrice,
            },
            category: {
                categoryName: listing.category.categoryName,
                numberOfProducts: listing.category.numberOfProducts,
            },
            numberOfListings: listing.numberOfListings,
            marketPrice: listing.marketPrice,
            images: listing.images,
            listingDescription: listing.listingDescription,
            listingStatus: listing.listingStatus,
            price: listing.price,
            user: {
                userId: listing.user.userId,
            },
        };
    });
}

export const startGetListing = () => {
    const listing = store.useState((state) => state.listing);
};



export const getByProductId = async (productId) => {
    try {
        const res = await request.get(`listings/product?productId=${productId}`);
        return res; 
    } catch (error) {
        outputError(error);
    }
};

export const getByUserId = async (userId) => {
    startGetListing();
    try {
        console.log('USER ID: ', userId);
        const res = await request.get(`listings/user?userId=${userId}`);
        console.log('RES: ', res);
        // return res; 
    } catch (error) {
        outputError(error);
    }

};

export const getById = async (listingId) => {
    try {
        const res = await request.get(`listings?listing_id=${listingId}`);
        return res; 
    } catch (error) {
        outputError(error);
    }

};

export const getImgById = async (listingId) => {
    try {
        const res = await request.get(`images/listings?listing_id=${listingId}`);
        return res; 
    } catch (error) {
        outputError(error);
    }
}

export const updateById = async (data) => {
    try {

        const res = await request.post(`listings`, data);
        return res; 
    } catch (error) {
        outputError(error);
    }

};

export const add = async (userId, data) => {
    try {
        const res = await request.post(`listings/add?userId=${userId}`, data);
        return res; 
    } catch (error) {
        outputError(error);
    }

};



const outputError = (error) => {
    return console.error(error);
}
