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
        avaLink: '',

        positiveRating: '',
        negativeRating: '',
        rating: '',

        phone: '',
        address: '',
        bankBranch: '',
        bankAccount: '',

        userStatus: 'Lessee',
        userMode: false,

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
preferences: {
    isDarkMode: false,
        pushNotifications: false,
    },
    
});
