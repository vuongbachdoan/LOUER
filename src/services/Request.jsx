import * as request from "../utils/request";

const create  = async(listingId, data) =>{
    //data body
    // + senderId: Long, id người đi thuê
    // + receiverId: Long, id người cho thuê
    // + lease_duration: Integer, số giờ thuê
    try {
        const res = await request.post(`images/users?user_id=${userId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

const get = async(listingId) =>{
    try {
        const res = await request.get(`request?listingId=${listingId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
}



const outputError = (error) => {
    return console.error(error);
}