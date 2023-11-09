import * as request from "../utils/request";
import * as Toast from "../components/Toast";
import axios from "axios";

export const getAllLessee = async (page, size, lesseeId, productName, categoryName, brandName) => {
    try {

        const json = {
            excludeUserId: lesseeId,
        }
        if (productName !== null) {
            json.productName = productName;
        }
        if (categoryName !== null || categoryName !== 'All') {
            json.categoryName = categoryName;
        }
        if (brandName !== null) {
            json.brandName = brandName;
        }
        const res = await axios.get(`https://www.louerapp.com/api/listings?page=${page}&size=${size}`, {
            data: json,
        }
        );
        console.log('Get all listings lessee res', res);
        return res.data;
    } catch (error) {
        outputError(error, "Listing-getAllLessee");
    }
};


// export const getAllLessee = async (page, size, lesseeId, productName, categoryName, brandName) => {
//     var headers = new Headers();
//     headers.append("Content-Type", "application/json");

//     const json = {
//         excludeUserId: lesseeId,
//     }
//     if (productName !== null) {
//         json.productName = productName;
//     }
//     if (categoryName !== null || categoryName !== 'All') {
//         json.categoryName = categoryName;
//     }
//     if (brandName !== null) {
//         json.brandName = brandName;

//         var request = {
//             method: 'GET',
//             headers: headers,
//             body: JSON.stringify(json),
//             redirect: 'follow'
//         };

//         fetch(`https://www.louerapp.com/api/listings?page=${page}&size=${size}`, request)
//             .then(response => {
//                 console.log('Get all listings lessee res', response);
//                 return response.json()
//             })
//             .then(result => console.log('Get all listings lessee result', result))
//             .catch(error => {
//                 outputError(error, "Listing-getAllLessee");
//             });
//     }
// }





export const getByProductId = async (productId) => {
    try {
        const res = await request.get(`listings/product?productId=${productId}`);
        return res;
    } catch (error) {
        outputError(error, "Listing-getByProductId");
    }
};

export const getByUserId = async (userId) => {
    try {
        const res = await request.get(`listings/user?userId=${userId}`);
        return res;
    } catch (error) {
        outputError(error, "Listing-getByUserId");
    }

};

export const getById = async (listingId) => {
    try {
        const res = await request.get(`listings?listingId=${listingId}`);
        return res;
    } catch (error) {
        outputError(error, "Listing-getById");
    }

};

export const getImgById = async (listingId) => {
    try {
        const res = await request.get(`images/listings?listingId=${listingId}`);
        return res["Images Links"];
    } catch (error) {
        outputError(error, "Listing-getImgById");
    }
}

export const updateById = async (data) => {
    try {

        const res = await request.post(`listings`, data);
        return res;
    } catch (error) {
        outputError(error, "Listing-updateById");
    }

};

export const add = async (userId, data) => {
    try {
        const res = await request.post(`listings/add?userId=${userId}`, data);
        return res;
    } catch (error) {
        outputError(error, "Listing-add");
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
        // console.log('error UPLOAD IMG', error);
        outputError(error, "Listing-addImg");
    }
};





const outputError = (error, step) => {
    Toast.show('Úi, lỗi mạng, mong bạn mở lại Louer nhé ><');
    return console.error("At " + step + " " + error);
}
