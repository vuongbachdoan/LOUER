import * as request from "../utils/request";


const getByProductId = async (productId) => {
    try {
        const res = await request.get('users/', {
            params: {
                id: productId
            }});
        return res.data; 
    } catch (error) {
        outputError(error);
    }

};







const outputError = (error) => {
    return console.error(error);
}
