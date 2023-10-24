import { Store } from 'pullstate';

export const color = {
    main: {
        lessee: '#22A4DD',
        lessor: '#FF5484'
    },
    gradient: {
        lessee: ['#269DDB', '#2A46B4'],
        lessor: ['#9F3553', '#E98EA6'],
    }
}

export const getMainColor = (userMode) => {
    return userMode ? color.main.lessee : color.main.lessor;
};

export const getGradientColor = (userMode) => {
    return userMode ? color.gradient.lessee : color.gradient.lessor;
};

