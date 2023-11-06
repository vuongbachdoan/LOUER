
export const getAllLessor = async (userId) => {
    try {
        const res = await request.get(`orders/lessor`,
            {
                params: {
                    userId
                }
            });
        return res;
    } catch (error) {
        outputError(error);
    }
};

export const getAllLessee = async (userId) => {
    try {
        const res = await request.get(`orders/lessee`,
            {
                params: {
                    userId
                }
            });
        return res;
    } catch (error) {
        outputError(error);
    }
};

export const getDetails = async (orderId) => {
    try {
        const res = await request.get(`orders`,{
            params: {
                orderId
            }
        });
        return res;
    } catch (error) {
        outputError(error);
    }
}

export const cancel = async (orderId) => {
    try {
        const res = await request.put(`orders/cancel`, {
            params: {
                orderId
            }
        });
        return res;
    } catch (error) {
        outputError(error);
    }
}




const outputError = (error) => {
    return console.error(error);
}
