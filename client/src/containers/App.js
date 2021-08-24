import {connect} from 'react-redux';
import App from '../App';

function mapStateToProps(state) {
    return {
        isLogined: state.protoReducer.isLogined,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginCheck: param => {
            dispatch({
                type: 'LOGINED',
                isLogined: param,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
