import {connect} from 'react-redux';
import SideNav from '../../../components/modules/sidenav/SideNav';

function mapStateToProps(state) {
    return {
        sideNavBarIsOpen: state.dialogReducer.sideNavBarIsOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleSideNavBar: bools => {
            dispatch({
                type: 'HANDLE_SIDE_NAV_BAR',
                sideNavBarIsOpen: bools,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);