
import * as request from "../utils/request";

export const postReview = async (senderId, receiverId, rating, reviewDescription) => {
    const body = {
        senderId: senderId,
        receiverId: receiverId,
        rating: rating,
        reviewDescription: reviewDescription,
    };
    try {
        const response = await request.post(`reviews`, body);
        return response
    } catch (error) {
        console.error(error);
    }
};

export const getUserReviews = async (userId) => {
    try {
        const response = await request.get(`reviews/user?userId=${userId}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const deleteReview = async (reviewId, senderId, userId) => {
    if (senderId === userId) {
        try {
            const response = await request.del(`reviews/delete?reviewId=${reviewId}`);
            return response;
        } catch (error) {
            console.error(error);
        }
    } else {
        console.error("You are not authorized to delete this review.");
    }
};








