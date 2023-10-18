import { Store } from 'pullstate';

export const store = new Store ({
    user: {
        userId: '',

        studentId: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phone: '',
        avaLink: '',

        positiveRating: '',
        negativeRating: '',
        rating: '',

        address: '',
        bankBranch: '',
        bankAccount: '',
        
        userStatus: 'Lessee',
        userMode: false,
        
        acceptedTnC: false,
    },
    product: {
        productId: '',
        productName: '',
        brand: {},
        category: {},
        numberOfProducts: 0,
        marketPrice: 0,
    },
    listing: {
        listingId: '',
        product: {},
        user: {},
        listingDescription: '',
        price: 0,
        listingStatus: 0,
    },
    preferences: {
        isDarkMode: false,
        pushNotifications: false,
    },
    
});
