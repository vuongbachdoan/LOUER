import * as request from "../utils/request";



export const getById = async (userId) => {
    try {
        const res = await request.get('users/', {
            params: {
                id: userId
            }});
        console.log(user)
        return user;
    } catch (error) {
        outputError(error);
    }
};

export const getImgById = async (userId) => {
    try {
        const res = await request.get('images/users/',{
            params: {
                user_id: userId 
            }
        })
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

export const updateImgById = async (userId) => {
    try {
        const res = await request.get('images/users/',{
            params: {
                user_id: userId 
            }
        })
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

export const deleteImgById = async(userId,data) =>{
    try {
        const res = await request.delete(`images/users?user_id=${userId}`);
        return res.data;
    } catch (error) {
        outputError(error);
    }
}


export const updateById = async (userId, data) => {
    try {
        const res = await request.put(`/users/${userId}`, data)
    } catch (error) {
        outputError(error);
    }
   };



   
const outputError = (error) => {
    return console.error(error);
}
