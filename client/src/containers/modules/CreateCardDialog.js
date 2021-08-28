import {connect} from 'react-redux';
import CreateCardDialog from '../../components/modules/CreateCardDialog';

function mapStateToProps(state) {
    return {
        createCardDialogIsOpen: state.dialogReducer.createCardDialogIsOpen,
        deckList: state.deckReducer.deckList,
        deckId: state.deckReducer.deckId,
        cardCategories: state.cardReducer.cardCategories,
        targetCardId: state.cardReducer.targetCardId,
        targetCardsCols: state.cardReducer.targetCardsCols,
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
            });
        },
        setAllCardCategories: cardList => {
            dispatch({
                type: 'SET_ALL_CARD_CATEGORIES',
                cardCategories: cardList,
            });
        },
        setTargetCard: (cardId, cardName) => {
            dispatch({
                type: 'SET_TARGET_CARD',
                targetCardId: cardId,
            });
        },
        setTargetCardsCols: data => {
            dispatch({
                type: 'SET_TARGET_CARDS_COLS',
                targetCardsCols: data,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCardDialog);
