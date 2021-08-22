import {createStore} from 'redux';

export default createStore((state, action) => {
    let returnValue;

    if (state === undefined) {
        returnValue = {
            isLogined: false,
            deckList: {},
        };
    } else if (action.type === 'LOGINED') {
        returnValue = {...state, isLogined: action.isLogined};
    } else if (action.type === 'CALL_ALL_DECK') {
        returnValue = {...state, deckList: action.deckList};
    }
    return returnValue;
});
