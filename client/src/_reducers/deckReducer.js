const initState = {
    deckList: [],
    deckId: -1,
    deckInfo: {},
};

export default function deckReducer(state = initState, action) {
    // createStore에 이 리듀서를 넣어서 store를 생성한다.
    switch (action.type) {
        case 'SET_ALL_DECK':
            return {...state, deckList: action.deckList};
        case 'SET_DECK_ID':
            return {...state, deckId: action.deckId};
        case 'SET_DECK_INFO':
            return {...state, deckInfo: action.deckInfo};
        default:
            return state;
    }
}
