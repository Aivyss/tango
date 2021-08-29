const initState = {
    createDeckDialogIsOpen: false,
    createCardDialogIsOpen: false,
    createCardCategoryDialogIsOpen: false,
    loginDialogIsOpen: true,
    signupDialogIsOpen: false,
    studyModeDialogIsOpen: false,
    sideNavBarIsOpen: false,
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
        case 'HANDLE_STUDY_MODE_DIALOG':
            return {...state, studyModeDialogIsOpen: action.studyModeDialogIsOpen};
        case 'HANDLE_SIDE_NAV_BAR':
            return {...state, sideNavBarIsOpen: action.sideNavBarIsOpen};
        case 'HANDLE_SIGN_UP_DIALOG':
            return {...state, signupDialogIsOpen: action.signupDialogIsOpen};
        default:
            return state;
    }
}
