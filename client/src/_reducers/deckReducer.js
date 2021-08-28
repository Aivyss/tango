const initState = {
    deckList: [], // 유저가 생성한 덱의 리스트
    deckId: -1, // 타겟 덱아이디
    deckInfo: {}, // 타겟 덱정보
    targetDeckName: '', // 타겟덱 이름
    studyCards: [], // 타겟 덱의 공부할 카드
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
            if (action.targetDeckName) {
                return {...state, deckId: action.deckId, targetDeckName: action.targetDeckName};
            } else {
                return {...state, deckId: action.deckId};
            }
        case 'SET_STUDY_CARDS':
            return {...state, studyCards: action.studyCards};
        default:
            return state;
    }
}
