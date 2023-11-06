import { number, string } from 'prop-types';
import { Store } from 'pullstate';

export const store = new Store({
    user: {
        userId: '',
        studentId: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        images: '',

        positiveRating: '',
        negativeRating: '',
        rating: '',

        phone: '',
        address: 1,


        bankName: '',
        cardNumber: '',
        cardName: '',

        userStatus: '1',
        userMode: true,

        acceptedTnC: false,
    },
    product: {
        productId: number,
        productName: string,
        brand: {},
        category: {},
        numberOfProducts: number,
        marketPrice: number,
    },
    listing: {
        listingId: number,
        product: [],
        category: {
            categoryId: number,
            categoryName: string,
            numberOfProducts: number,
        },
        numberOfListings: number,
        marketPrice: number,
    },
    address: {
        1: 'ĐH FPT Khu Công nghệ Cao, Quận 9, TP.HCM',
        2: 'NVH Sinh viên, Quận Thủ Đức, TP.HCM',
    },
    listingStatusLessor:{
        0: 'Đang thuê',
        1: 'Sẵn sàng',
        2: 'Chờ duyệt',
    },
    listingStatusLessee:{
        0: 'Đang thuê',
        1: 'Đặt thuê',
        2: 'Chờ phía cho thuê',
    },
    listingStatusColor:{
        0: '#f65683',
        1: '#22a4dd',
        2: '#fdb400'
    },
    orderStatus:{
        0: 'Chờ thuê',
        1: 'Đang thuê',
        2: 'Đã thuê',
        3: 'Đã hủy',
    },
    orderStatusColor:{
        0: '#fdb400',
        1: '#22a4dd',
        2: '#f65683',
        3: '#ff0000',
    },
    louerBank: {
        bankName: 'vietinbank',
        bankNameFull: 'VietinBank',
        cardName: 'Hoàng Vũ Minh Tài',
        cardNumber: '104879541523',
    },
    preferences: {
        isDarkMode: false,
        pushNotifications: false,
    },
});
