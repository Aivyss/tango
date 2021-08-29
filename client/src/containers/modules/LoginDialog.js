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
        handleLoginDialog: bools => {
            dispatch({
                type: 'HANDLE_LOGIN_DIALOG',
                loginDialogIsOpen: bools,
            });
        },
        handleSignupDialog: bools => {
            dispatch({
                type: 'HANDLE_SIGN_UP_DIALOG',
                signupDialogIsOpen: bools,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
