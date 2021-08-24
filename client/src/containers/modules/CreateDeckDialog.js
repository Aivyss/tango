import {connect} from 'react-redux';
import CreateDeckDialog from '../../components/modules/CreateDeckDialog';
import {get, post} from 'axios';

function mapStateToProps(state) {
    return {
        checkDuplicatedName: function (name, setIsValidDeck) {
            const url = '/api/checkDuplicated-deck-name?name=' + name;

            get(url)
                .then(res => {
                    const isValid = res.data.length === 0 ? true : false;

                    if (!isValid) {
                        alert('中腹のデックネームです。');
                        setIsValidDeck(false);
                    }
                })
                .catch(() => {
                    console.log('중복조회 실패');
                });
        },
        valueChange: function (e, callBackSetState) {
            const value = e.target.value;
            callBackSetState(value);
        },
        checkValidation: function (value) {
            let isValid = false;

            if (value.length <= 0) {
                alert('文字列を入力してください。');
            } else if (value.length > 60) {
                alert('文字列は６０文字以下で入力してください。');
            } else {
                isValid = true;
            }

            return isValid;
        },
        createDeck: function (name, isValidDeck) {
            const isValid = !this.checkValidation(name) ? false : true;

            if (isValid && isValidDeck) {
                const url = '/api/create-deck';
                const config = {
                    headers: {
                        'content-type': 'application/json',
                    },
                };
                const data = {
                    deckName: name,
                    userId: Number(sessionStorage.getItem('primaryKey')),
                };

                return post(url, data, config)
                    .then(res => {
                        alert('デックを作成しました。');
                        window.location.href = '/';
                    })
                    .catch(err => {
                        console.log('デックの作成のエラー');
                        console.log(err);
                    });
            } else {
                alert('入力した情報が正しくありません。');
            }
        },
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeckDialog);
