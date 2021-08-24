import {connect} from 'react-redux';
import App from '../App';

function mapStateToProps(state) {
    return {
        isLogined: state.accountReducer.isLogined,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
