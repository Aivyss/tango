import {connect} from 'react-redux';
import DeckList from '../../components/modules/DeckList';
import {get} from 'axios';

function mapStateToProps(state) {
    return {
        getDeckCount: () => {
            return state.deckList.length ? state.deckList.length : 0;
        },
        getDeckList: () => {
            return state.deckList;
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
                    dispatch({
                        type: 'CALL_ALL_DECK',
                        deckList: res.data,
                    });
                })
                .catch(() => {
                    console.log('failed deck loading');
                });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToPros)(DeckList);