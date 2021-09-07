import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import {TextField} from '@material-ui/core';
import axios from 'axios';

// * Recoils
import {useRecoilState} from 'recoil';
import {dDOpenState} from '../../_recoil';

// * Props Interface
interface PropsDeckDialog {
    closeDeckDialog(): void;
    createDeckDialogIsOpen: boolean;
}

// * Container Component
export default function Container() {
    const [deckDialog, setDeckDialog] = useRecoilState(dDOpenState);

    const closeDeckDialog = () => {
        setDeckDialog(false);
    };

    return <CreateDeckDialog closeDeckDialog={closeDeckDialog} createDeckDialogIsOpen={deckDialog} />;
}

// * Presentational Components
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {children?: React.ReactElement<any, any>},
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function CreateDeckDialog(props: PropsDeckDialog) {
    let [name, setName] = useState('');
    let [isValidDeck, setIsValidDeck] = useState(true);

    const handleClose = () => {
        setIsValidDeck(true);
        setName('');
        props.closeDeckDialog();
    };

    const valueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const checkValidation = function (value: string) {
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

    const createDeck = function () {
        const isValid = checkValidation(name);

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

            axios
                .post(url, data, config)
                .then(() => {
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

    const checkDuplicatedName = function (name: string) {
        const url = '/api/decks/checkDuplicated-deck-name';

        axios
            .get(url, {
                params: {
                    userId: localStorage.getItem('primaryKey'),
                    name: name,
                },
            })
            .then(res => {
                const isValid = res.data.length === 0;
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
            checkDuplicatedName(name);
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
