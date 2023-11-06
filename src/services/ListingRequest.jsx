import axios from "axios";
import *  as request from "../utils/request";
import * as Toast from "../components/Toast";


export const getAllRequestsByLesseeId = async (lesseeId) => {
    try {
        const res = await request.get(`requests/lesseeRequests/lessee?lesseeId=${lesseeId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

export const getAllRequestsByLessorId = async (lessorId) => {
    try {
        const res = await request.get(`requests/lesseeRequests/lessor?lessorId=${lessorId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

export const getAllRequestsByListingId = async (listingId) => {
    try {
        const res = await request.get(`requests/lesseeRequests/listing?listingId=${listingId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

export const getRequestById = async (requestId) => {
    try {
        const res = await request.get(`requests/lesseeRequests?requestId=${requestId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};






export const lessorAcceptRequest = async (requestId) => {
    try {
        const res = await request.put(`requests/lesseeRequests/accept?requestId=${requestId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

export const lessorDenyRequest = async (requestId) => {
    try {
        const res = await request.put(`requests/lesseeRequests/deny?requestId=${requestId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};










export const lesseeSendRequest = async (listingId, lesseeId, duration) => {
    try {
        const res = await request.post(`requests/lesseeRequests/add?listingId=${listingId}`, {
            senderId: lesseeId,
            leaseDuration: duration
        });
        return res.data;
    } catch (error) {
        outputError(error);
    }
};


export const lesseeCancelRequest = async (requestId) => {
    try {
        const res = await request.put(`requests/lesseeRequests/cancel?requestId=${requestId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

export const lesseeUpdateRequestDur = async (requestId, duration) => {
    try {
        const res = await request.put(`requests/lesseeRequests/update?requestId=${requestId}`, {
            leaseDuration: duration
        });
        return res.data;
    } catch (error) {
        outputError(error);
    }
};



const outputError = (error) => {
    Toast.show('Úi, lỗi mạng, mong bạn mở lại Louer nhé ><');
    Toast.show(error.message);
}
