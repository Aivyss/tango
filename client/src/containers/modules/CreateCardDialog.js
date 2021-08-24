import {connect} from 'react-redux';
import CreateCardDialog from '../../components/modules/CreateCardDialog';
import {get, post} from 'axios';

function mapStateToProps(state) {
    return {
        getDeckId: function () {
            return state.deckReducer.deckId;
        },
        getDeckInfo: function () {
            const url = '/api/get-deck-info/deckId=' + state.deckReducer.deckId;
            return get(url)
                .then(res => {
                    return res.data;
                })
                .catch(err => {
                    console.log('덱 인포 불러오기 실패');
                    console.log(err);
                });
        },
        getKindOfCard: function () {
            const userId = sessionStorage.getItem('primaryKey');
            const url = '/api/get-kind-of-card/userId=' + userId;

            return get(url).then(res => {
                const data = res.data;

                return data;
            });
        },
        getCardStructure: function (deckId) {
            const url = '/api/get-card-structure/deckId=' + deckId;
            return get(url).then(res => {
                const data = res.data;
            });
        },
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCardDialog);
