import {connect} from 'react-redux';
import App from '../App';

function mapStateToProps(state) {
    return {
        isLogined: state.accountReducer.isLogined,
        loginDialogIsOpen: state.dialogReducer.loginDialogIsOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleLoginDialog: bools => {
            dispatch({
                type: 'HANDLE_LOGIN_DIALOG',
                loginDialogIsOpen: bools,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
