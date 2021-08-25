import {connect} from 'react-redux';
import CreateCardDialog from '../../components/modules/CreateCardDialog';
import {get, post} from 'axios';

function mapStateToProps(state) {
    return {
        createCardDialogIsOpen: state.dialogReducer.createCardDialogIsOpen,
        deckList: state.deckReducer.deckList,
        deckId: state.deckReducer.deckId,
        targetDeckName: state.deckReducer.targetDeckName,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleCreateCardDialog: bools => {
            dispatch({
                type: 'HANDLE_CREATE_CARD_DIALOG',
                createCardDialogIsOpen: bools,
            });
        },
        setTargetDeck: (deckId, deckName) => {
            dispatch({
                type: 'SET_TARGET_DECK',
                deckId: deckId,
                targetDeckName: deckName,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCardDialog);
