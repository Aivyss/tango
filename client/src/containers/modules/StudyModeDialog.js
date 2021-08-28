import {connect} from 'react-redux';
import StudyModeDialog from '../../components/modules/StudyModeDialog';

function mapStateToProps(state) {
    return {
        studyModeDialogIsOpen: state.dialogReducer.studyModeDialogIsOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleStudyModeDialog: bools => {
            dispatch({
                type: 'HANDLE_STUDY_MODE_DIALOG',
                studyModeDialogIsOpen: bools,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyModeDialog);
