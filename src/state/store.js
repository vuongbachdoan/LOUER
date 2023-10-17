import { Store } from 'pullstate';

export const store = new Store ({
    user: {
        firstName: '',
        lastName: '',
        acceptedTnC: false,
        role: 'Lessor'
    },
    preferences: {
        isDarkMode: false,
        pushNotifications: false,
    },
});