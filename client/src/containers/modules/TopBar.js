import {connect} from 'react-redux';
import TopBar from '../../components/modules/TopBar';

function mapStateToProps(state) {
    return {
        createDeckDialogIsOpen: state.dialogReducer.createDeckDialogIsOpen,
        createCardDialogIsOpen: state.dialogReducer.createCardDialogIsOpen,
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
                createDeckDialogIsOpen: true,
            });
        },
        closeCreateCardDialog: function () {
            dispatch({
                type: 'HANDLE_CREATE_CARD_DIALOG',
                createDeckDialogIsOpen: false,
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
