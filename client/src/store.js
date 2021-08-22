import {createStore} from 'redux';

export default createStore((state, action) => {
    let returnValue;

    if (state === undefined) {
        returnValue = {
            isLogined: false,
        };
    } else if (action.type === 'LOGINED') {
        returnValue = {...state, isLogined: action.isLogined};
    }

    return returnValue;
});
