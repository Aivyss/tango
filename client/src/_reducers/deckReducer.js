const initState = {
    deckList: [],
    deckId: -1, // 타겟 덱아이디
    targetDeckName: '', // 타겟 덱네임
    deckInfo: {}, // 타겟 덱정보
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
        case 'SET_TARGET_DECK':
            return {...state, deckName: action.targetDeckName, deckId: action.deckId};
        default:
            return state;
    }
}
