import { Store } from 'pullstate';

export const store = new Store ({
    user: {
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
        
        userStatus: 'Lessee',
        userMode: '',
        
        acceptedTnC: false,
    },
    preferences: {
        isDarkMode: false,
        pushNotifications: false,
    },
});