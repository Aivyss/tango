import {connect} from 'react-redux';
import DeckStatus from '../../../components/pages/deckroom/DeckStatus';
import {get, post} from 'axios';

function mapStateToProps(state) {
    return {
        getDeckId: function () {
            return Number(state.deckReducer.deckId);
        },
        getDeckInfo: function () {
            console.log('deckStatusContainer ~', state.deckReducer.deckId);
            console.log('deckStatusContainer ~', state.accountReducer.isLogined);
            console.log('deckStatusContainer ~', state.deckReducer.deckList);
            console.log('deckStatusContainer ~', state.deckReducer.deckInfo);
            console.log('deckStatusContainer ~', state.deckReducer);
            return state.deckReducer.deckInfo;
        },
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, null)(DeckStatus);
