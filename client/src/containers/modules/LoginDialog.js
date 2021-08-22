import {connect} from 'react-redux';
import LoginDialog from '../../components/modules/LoginDialog';

function mapStateToProps(state) {
    return {
        isLogined: state.isLogined,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        doLogin: param => {
            dispatch({
                type: 'LOGINED',
                isLogined: param,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
