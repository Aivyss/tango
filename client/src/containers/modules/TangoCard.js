import {connect} from 'react-redux';
import TangoCard from '../../components/modules/TangoCard';

function mapStateToProps(state) {
    return {
        studyCards: state.deckReducer.studyCards,
        targetDeckName: state.deckReducer.targetDeckName,
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
        setStudyCards: array => {
            dispatch({
                type: 'SET_STUDY_CARDS',
                studyCards: array,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TangoCard);
