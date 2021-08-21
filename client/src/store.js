import {createStore} from 'redux';

export default createStore((state, action) => {
    let returnValue;

    if (state === undefined) {
        returnValue = {};
    }

    return returnValue;
});
