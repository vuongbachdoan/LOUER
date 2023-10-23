import { Store } from 'pullstate';

export const color = new Store({
    value: true,
    main: {
        lessee: '#22A4DD',
        lessor: '#FF5484'
    },
    gradient: {
        lessee: ['#269DDB', '#2A46B4'],
        lessor: ['#9F3553', '#E98EA6'],
    }
});

export const getMainColor = (userMode) => {
    const { main } = color.useState();
    return userMode ? main.lessee : main.lessor;
};

export const getGradientColor = (userMode) => {
    const { gradient } = color.useState();
    return userMode ? gradient.lessee : gradient.lessor;
};

