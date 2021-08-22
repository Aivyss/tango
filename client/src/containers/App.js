import {connect} from 'react-redux';
import App from '../App';

function mapStateToProps(state) {
    return {
        isLogined: state.isLogined,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginCheck: param => {
            console.log('로그인첵 실행');
            console.log('🚀 ~ file: App.js ~ line 14 ~ mapDispatchToProps ~ param', param);

            dispatch({
                type: 'LOGINED',
                isLogined: param,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
