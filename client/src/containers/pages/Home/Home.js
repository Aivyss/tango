import {connect} from 'react-redux';
import Home from '../../../components/pages/Home/Home';

function mapStateToProps(state) {
    return {
        isLogined: state.isLogined,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
