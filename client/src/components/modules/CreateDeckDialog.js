import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TextField} from '@material-ui/core';
import {get, post} from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function CreateDeckDialog(props) {
    let [name, setName] = useState('');
    let [isValidDeck, setIsValidDeck] = useState(true);

    const handleClose = () => {
        props.closeDeckDialog();
    };

    const valueChange = e => {
        setName(e.target.value);
    };

    const checkValidation = function (value) {
        let isValid = false;

        if (value.length <= 0) {
            alert('文字列を入力してください。');
        } else if (value.length > 60) {
            alert('文字列は６０文字以下で入力してください。');
        } else {
            isValid = true;
        }

        return isValid;
    };

    const createDeck = function (name, isValidDeck) {
        const isValid = !checkValidation(name) ? false : true;

        if (isValid && isValidDeck) {
            const url = '/api/decks/create-deck';
            const config = {
                headers: {
                    'content-type': 'application/json',
                },
            };
            const data = {
                deckName: name,
                userId: Number(localStorage.getItem('primaryKey')),
            };

            post(url, data, config)
                .then(res => {
                    alert('デックを作成しました。');
                    window.location.href = '/';
                })
                .catch(err => {
                    console.log('デックの作成のエラー');
                    console.log(err);
                })
                .then(() => {
                    handleClose();
                });
        } else {
            alert('入力した情報が正しくありません。');
        }
    };

    const checkDuplicatedName = function (name, setIsValidDeck) {
        const url = '/api/decks/checkDuplicated-deck-name?name=' + name;

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
    };

    useEffect(() => {
        const length = name.length;
        if (length !== null && length !== undefined && length > 0) {
            checkDuplicatedName(name, isValidDeck, setIsValidDeck);
        }
    }, [name]);

    return (
        <main>
            <div>
                <Dialog
                    open={props.createDeckDialogIsOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-slide-title'
                    aria-describedby='alert-dialog-slide-description'
                >
                    <DialogTitle id='alert-dialog-slide-title'>{'Create Deck'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-slide-description'>
                            デックの名を付けてください。
                        </DialogContentText>
                        <TextField type='text' label='DECK NAME' name='name' onChange={valueChange} /> <br />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={createDeck} color='primary'>
                            create deck
                        </Button>
                        <Button onClick={handleClose} color='primary'>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </main>
    );
}
