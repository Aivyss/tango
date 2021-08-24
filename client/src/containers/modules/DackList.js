import {connect} from 'react-redux';
import DeckList from '../../components/modules/DeckList';
import {get} from 'axios';

function mapStateToProps(state) {
    return {
        getDeckCount: () => {
            const length = state.protoReducer.deckList.length;
            return length ? length : 0;
        },
        getDeckList: () => {
            return state.protoReducer.deckList;
        },
    };
}

function mapDispatchToPros(dispatch) {
    return {
        callDecksFromApi: param => {
            const id = param;
            const url = '/api/callAllDecks?id=' + id;

            return get(url)
                .then(res => {
                    console.log('get res=', res.data);
                    dispatch({
                        type: 'CALL_ALL_DECK',
                        deckList: res.data,
                    });

                    return res.data;
                })
                .catch(() => {
                    console.log('failed deck loading');
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
    };
}

export default connect(mapStateToProps, mapDispatchToPros)(DeckList);
