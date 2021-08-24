import {connect} from 'react-redux';
import LoginDialog from '../../components/modules/LoginDialog';

function mapStateToProps(state) {
    return {
        isLogined: state.accountReducer.isLogined,
        loginDialogIsOpen: state.dialogReducer.loginDialogIsOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        doLogin: param => {
            dispatch({
                type: 'HANDLE_LOGIN',
                isLogined: param,
            });
        },
        closeLoginDislog: () => {
            dispatch({
                type: 'HANDLE_LOGIN_DIALOG',
                loginDialogIsOpen: false,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
