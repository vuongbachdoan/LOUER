import * as request from "../utils/request";
import * as Toast from '../components/Toast';

export const createSession = async (userId1, userId2) => {
    try {
        const res = await request.post('messages', {
            userId1,
            userId2,
        });
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

export const getAllSessions = async (userId) => {
    try {
        const res = await request.get(`messages?userId=${userId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

export const getMessagesInSession = async (sessionId) => {
    try {
        const res = await request.get(`messages/session?sessionId=${sessionId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

export const sendMessage = async (sessionId, senderId, receiverId, body) => {
    try {
        const res = await request.post(`messages/session?sessionId=${sessionId}`, {
            senderId,
            receiverId,
            body,
        });
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

const outputError = (error) => {
    Toast.show('Úi, lỗi mạng, mong bạn mở lại Louer nhé ><');
    return console.error(error);
};
