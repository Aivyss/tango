const initState = {
    cardCategories: [], // 카드 유형정보
    targetCardId: -1, // 타겟 카드의 아이디
    targetCardsCols: [], // 타겟 카드의 컬럼정보
    studyCards: [],
};

export default function cardReducer(state = initState, action) {
    switch (action.type) {
        case 'SET_ALL_CARD_CATEGORIES':
            return {...state, cardCategories: action.cardCategories};
        case 'SET_TARGET_CARD':
            return {...state, targetCardId: action.targetCardId};
        case 'SET_TARGET_CARDS_COLS':
            return {...state, targetCardsCols: action.targetCardsCols};
        case 'SET_STUDY_CARDS':
            return {...state, studyCards: action.studyCards};
        default:
            return state;
    }
}
