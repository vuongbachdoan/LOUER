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
        bankBranch: '',
        bankAccount: '',

        userStatus: 'Lessee',
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
    listingStatus:{
        0: 'Đang thuê',
        1: 'Sẵn sàng',
        2: 'Chờ duyệt'
    },
    listingStatusColor:{
        0: '#f65683',
        1: '#22a4dd',
        2: '#fdb400'
    },
    preferences: {
        isDarkMode: false,
        pushNotifications: false,
    },



});
