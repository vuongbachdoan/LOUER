import * as request from "../utils/request";
import * as Toast from "../components/Toast";




export const getAllByPageSize = async (page, size) => {
    try {
        const res = await request.get(`listings?page=${page}&size=${size}`);
        return res; 
    } catch (error) {
        outputError(error);
    }
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
    try {
        const res = await request.get(`listings/user?userId=${userId}`);
        return res; 
    } catch (error) {
        outputError(error);
    }

};

export const getById = async (listingId) => {
    try {
        const res = await request.get(`listings?listingId=${listingId}`);
        return res; 
    } catch (error) {
        outputError(error);
    }

};

export const getImgById = async (listingId) => {
    try {
        const res = await request.get(`images/listings?listingId=${listingId}`);
        return res["Images Links"]; 
    } catch (error) {
        outputError(error);
    }
}

export const updateById = async (data) => {
    try {

        const res = await request.post(`listings`, data );
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





const outputError = (error) => {
    Toast.show('Úi, lỗi mạng, mong bạn mở lại Louer nhé ><');
    return console.error(error);
}
