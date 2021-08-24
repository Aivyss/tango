import {connect} from 'react-redux';
import DeckStatus from '../../../components/pages/deckroom/DeckStatus';
import {get, post} from 'axios';

function mapStateToProps(state) {
    return {
        getDeckId: function () {
            return Number(state.protoReducer.deckId);
        },
        getDeckInfo: function () {
            console.log('deckStatusContainer ~', state.protoReducer.deckId);
            console.log('deckStatusContainer ~', state.protoReducer.isLogined);
            console.log('deckStatusContainer ~', state.protoReducer.deckList);
            console.log('deckStatusContainer ~', state.protoReducer.deckInfo);
            console.log('deckStatusContainer ~', state.protoReducer);
            return state.protoReducer.deckInfo;
        },
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, null)(DeckStatus);
