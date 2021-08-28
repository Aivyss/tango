import {connect} from 'react-redux';
import DeckStatus from '../../../components/pages/deckroom/DeckStatus';
import {get, post} from 'axios';

function mapStateToProps(state) {
    return {
        deckId: state.deckReducer.deckId,
        deckInfo: state.deckReducer.deckInfo,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setStudyCards: studyCards => {
            dispatch({
                type: 'SET_STUDY_CARDS',
                studyCards: studyCards,
            });
        },
        handleStudyModeDialog: bools => {
            dispatch({
                type: 'HANDLE_STUDY_MODE_DIALOG',
                studyModeDialogIsOpen: bools,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckStatus);
