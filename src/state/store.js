import { Store } from 'pullstate';

export const store = new Store ({
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
