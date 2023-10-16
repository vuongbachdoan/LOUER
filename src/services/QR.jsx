import axios from "axios";

const genImgLink = (bankId, cardNumber, accName, amount, transNote) => {
    try {
        const img = `https://img.vietqr.io/image/${bankId}-${cardNumber}-qr_only.png?amount=${amount}&addInfo=${transNote}&accountName=${accName}`;
        return img;
    } catch (error) {
        outputError(error);
    }
};



export default genImgLink;






