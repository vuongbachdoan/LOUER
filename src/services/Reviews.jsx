
import * as request from "../utils/request";

export const postReview = async (senderId, receiverId, rating, reviewDescription) => {
    const body = {
        senderId: senderId,
        receiverId: receiverId,
        rating: rating,
        reviewDescription: reviewDescription,
    };
    try {
        const response = await request.post(`${url}/reviews`, body);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getReviewsByUserId = async (userId) => {
    try {
        const response = await request.get(`${url}/reviews/user?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteReview = async (reviewId, senderId, userId) => {
    if (senderId === userId) {
        try {
            const response = await request.del(`${url}/reviews/delete?reviewId=${reviewId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    } else {
        console.error("You are not authorized to delete this review.");
    }
};








