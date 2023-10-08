import * as request from "../utils/request"; 


const getAll = async (page, size) => {
    try {
        const res = await request.get(`/users/${userId}/orders`, {
            params: {
                page,
                size,
            }
        });
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

const getSingle = async (page, size) => {
    try {
        const res = await request.get(`/users/${userId}/orders`, {
            params: {
                orderId,
            }
        });
        return res.data;
    } catch (error) {
        outputError(error);
    }
};



const outputError = (error) => {
    return console.error(error);
}