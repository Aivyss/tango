import {connect} from 'react-redux';
import TopBar from '../../components/modules/TopBar';

function mapStateToProps(state) {
    return {
        createDeckDialogIsOpen: state.dialogReducer.createDeckDialogIsOpen,
        createCardDialogIsOpen: state.dialogReducer.createCardDialogIsOpen,
        createCardCategoryDialogIsOpen: state.dialogReducer.createCardCategoryDialogIsOpen,
        isLogined: state.accountReducer.isLogined,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openCreateDeckDialog: function () {
            dispatch({
                type: 'HANDLE_CREATE_DECK_DIALOG',
                createDeckDialogIsOpen: true,
            });
        },
        closeCreateDeckDialog: function () {
            dispatch({
                type: 'HANDLE_CREATE_DECK_DIALOG',
                createDeckDialogIsOpen: false,
            });
        },
        openCreateCardDialog: function () {
            dispatch({
                type: 'HANDLE_CREATE_CARD_DIALOG',
                createCardDialogIsOpen: true,
            });
        },
        closeCreateCardDialog: function () {
            dispatch({
                type: 'HANDLE_CREATE_CARD_DIALOG',
                createCardDialogIsOpen: false,
            });
        },
        doLogout: function () {
            dispatch({
                type: 'HANDLE_LOGIN',
                isLogined: false,
            });
            dispatch({
                type: 'HANDLE_LOGIN_DIALOG',
                loginDialogIsOpen: true,
            });
        },
        handleCreateCardCategoryDialog: bools => {
            dispatch({
                type: 'HANDLE_CREATE_CARD_CATEGORY_DIALOG',
                createCardCategoryDialogIsOpen: bools,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
