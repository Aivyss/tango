import {connect} from 'react-redux';
import DeckList from '../../components/modules/DeckList';
import {get} from 'axios';

function mapStateToProps(state) {
    return {
        deckList: state.deckReducer.deckList,
    };
}

function mapDispatchToPros(dispatch) {
    return {
        setDeckList: function (deckList) {
            dispatch({
                type: 'SET_ALL_DECK',
                deckList: deckList,
            });
        },
        setTargetDeckId: function (deckId) {
            console.log('deckList ~ deckId: ', deckId);
            dispatch({
                type: 'SET_DECK_ID',
                deckId: deckId,
            });
        },
        setDeckInfo: function (deckId) {
            const url = '/api/get-deck-info/?deckId=' + deckId;

            return get(url)
                .then(res => {
                    const data = res.data;
                    console.log('deckList ~ deckInfo ~ apicall:', data);
                    dispatch({
                        type: 'SET_DECK_INFO',
                        deckInfo: data,
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        setTargetDeck: function (deckId, deckName) {
            dispatch({
                type: 'SET_TARGET_DECK',
                targetDeckName: deckName,
                deckId: deckId,
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToPros)(DeckList);
