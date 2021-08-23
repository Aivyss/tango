import {connect} from 'react-redux';
import CreateCardDialog from '../../components/modules/CreateCardDialog';
import {get, post} from 'axios';

function mapStateToProps(state) {
    return {
        getDeckId: function () {
            return state.deckId;
        },
        getDeckInfo: function () {
            const url = '/api/get-deck-info/deckId=' + state.deckId;
            return get(url)
                .then(res => {
                    return res.data;
                })
                .catch(err => {
                    console.log('덱 인포 불러오기 실패');
                    console.log(err);
                });
        },
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCardDialog);
