import * as request from "../utils/request";
import { enviroment } from "../state/enviroment";
import { formToJSON } from "axios";


export const getById = async (userId) => {
    try {
        const res = await request.get(`bankCreds?userId=${userId}`);
        return res;
    } catch (error) {
        outputError(error);
    }
};

export const add = async (data) => {
    const json = {
        userId: data.userId,
        bankName: data.bankName,
        cardNumber: data.cardNumber,
        cardName: data.cardName
    };
    console.log('JSON BANK', json);
    try {
        const res = await axios.post(`https://www.louerapp.com/api/bankCreds/add`, formToJSON(json), {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return res.data;
    } catch (error) {
        outputError(error);
    }
};

export const update = async (data) => {
    const json = {
        userId: data.userId,
        bankName: data.bankName,
        cardNumber: data.cardNumber,
        cardName: data.cardName
    };

    axios.put(`https://www.louerapp.com/api/bankCreds/update`, formToJSON(json), {
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }).then(async (res) => {
        return res;
    })
};


export const checkingTransaction = async (data) => {
    try {
        const response = await axios.get('https://oauth.casso.vn/v2/transactions', {
          params: {
            pageSize: 5,
            sort: 'ASC'
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Apikey ${enviroment.useState((state) => state.cassoAPI)}`,
          }
        });
        return response.data;
      } catch (error) {
        console.error(error);
      }
};





const outputError = (error) => {
    Toast.show('Úi, lỗi mạng, mong bạn mở lại Louer nhé ><');
    return console.error(error);
}
