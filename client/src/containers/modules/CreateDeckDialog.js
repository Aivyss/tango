import {connect} from 'react-redux';
import CreateDeckDialog from '../../components/modules/CreateDeckDialog';

function mapStateToProps(state) {
    return {
        createDeckDialogIsOpen: state.dialogReducer.createDeckDialogIsOpen,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        closeDeckDialog: function () {
            dispatch({
                type: 'HANDLE_CREATE_DECK_DIALOG',
                createDeckDialogIsOpen: false,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeckDialog);
