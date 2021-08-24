const initState = {
    isLogined: false,
};

export default function accountReducer(state = initState, action) {
    switch (action.type) {
        case 'HANDLE_LOGIN':
            return {...state, isLogined: action.isLogined};
        default:
            return state;
    }
}
