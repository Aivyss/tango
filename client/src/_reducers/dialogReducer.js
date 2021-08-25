const initState = {
    createDeckDialogIsOpen: false,
    createCardDialogIsOpen: false,
    createCardCategoryDialogIsOpen: false,
    loginDialogIsOpen: true,
    targetCardType: -1,
};

export default function dialogReducer(state = initState, action) {
    switch (action.type) {
        case 'HANDLE_CREATE_DECK_DIALOG':
            return {...state, createDeckDialogIsOpen: action.createDeckDialogIsOpen};
        case 'HANDLE_CREATE_CARD_DIALOG':
            return {...state, createCardDialogIsOpen: action.createCardDialogIsOpen};
        case 'HANDLE_LOGIN_DIALOG':
            return {...state, loginDialogIsOpen: action.loginDialogIsOpen};
        case 'HANDLE_CREATE_CARD_CATEGORY_DIALOG':
            return {...state, createCardCategoryDialogIsOpen: action.createCardCategoryDialogIsOpen};
        default:
            return state;
    }
}
