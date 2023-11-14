import *  as request from "../utils/request";


export const getAllChat = async (userId) => {
    try {
        const res = await request.get(`messages?userId=${userId}`);
        return res; 
    } catch (error) {
        outputError(error);
    }
};


export const getDetailsBySessionId = async (sessionId) => {
    try {
        const res = await request.get(`messages/session?sessionId=${sessionId}`);
        return res; 
    } catch (error) {
        outputError(error);
    }
};

export const sendMessage = async (sessionId, senderId, receiverId, body) => {
    const message = {
        senderId: senderId,
        receiverId: receiverId,
        body: body
    };
    try {     
        const res = await request.post(`messages/session?sessionId=${sessionId}`, message);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

export const createChatSession = async (userId1, userId2) => {
    const chatSession = {
        userId1: userId1,
        userId2: userId2
    };
    try {
        const res = await request.post(`messages`, chatSession);
        return res;
    } catch (error) {
        outputError(error);
    }
};


const outputError = (error) => {
    return console.error(error);
}
