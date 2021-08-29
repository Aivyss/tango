import {connect} from 'react-redux';
import SignupDialog from '../../components/modules/SignupDialog';

function mapStateToProps(state) {
    return {
        loginDialogIsOpen: state.dialogReducer.loginDialogIsOpen,
        signupDialogIsOpen: state.dialogReducer.signupDialogIsOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleSignupDialog: bools => {
            dispatch({
                type: 'HANDLE_SIGN_UP_DIALOG',
                signupDialogIsOpen: bools,
            });
        },
        handleLoginDialog: bools => {
            dispatch({
                type: 'HANDLE_LOGIN_DIALOG',
                loginDialogIsOpen: bools,
            });
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupDialog);
