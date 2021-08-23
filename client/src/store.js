import {createStore} from 'redux';

export default createStore((state, action) => {
    let returnValue;

    if (state === undefined) {
        returnValue = {
            isLogined: false,
            deckList: {},
            deckId: -1,
        };
    } else if (action.type === 'LOGINED') {
        returnValue = {...state, isLogined: action.isLogined};
    } else if (action.type === 'CALL_ALL_DECK') {
        returnValue = {...state, deckList: action.deckList};
    } else if (action.type === 'SET_DECK_ID') {
        returnValue = {...state, deckId: action.deckId};
    }
    return returnValue;
});
