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
import {useHistory} from 'react-router-dom';
import LoginDialog from '../../containers/modules/LoginDialog';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function SignupDialog(props) {
    let [open, setOpen] = useState(false);
    let [id, setId] = useState('');
    let [pw, setPw] = useState('');
    let [pwCf, setPwCf] = useState('');
    let [isValidAccount, setIsValidAccount] = useState(true);

    const handleClickOpen = () => {};

    const handleClose = () => {
        setOpen(false);
    };

    const checkValidation = value => {
        let isValid = false;

        if (value.length <= 0) {
            alert('文字列を入力してください。');
        } else if (value.length < 5) {
            alert('文字列が５字以上です。');
        } else if (value.length > 60) {
            alert('文字列は６０文字以下で入力してください。');
        } else {
            isValid = true;
        }

        return isValid;
    };

    const valueChange = e => {
        const stateName = e.target.name;
        const value = e.target.value;

        if (stateName === 'id') {
            setId(value);
        } else if (stateName === 'password') {
            setPw(value);
        } else if (stateName === 'password-confirm') {
            setPwCf(value);
        }
    };

    const signup = () => {
        const isValid = !checkValidation(id)
            ? false
            : !checkValidation(pw)
            ? false
            : !checkValidation(pwCf)
            ? false
            : true;
        const pwIsValid = pw === pwCf;
        console.log('🚀 ~ file: SignupDialog.js ~ line 71 ~ signup ~ pwIsValid', pwIsValid);
        console.log('🚀 ~ file: SignupDialog.js ~ line 71 ~ signup ~ isValid', isValid);

        if (isValid && pwIsValid && isValidAccount) {
            const url = '/api/signup';
            const config = {
                headers: {
                    'content-type': 'application/json',
                },
            };
            const data = {
                STRING_ID: id,
                PASSWORD: pw,
            };

            post(url, data, config)
                .then(res => {
                    setOpen(false);
                    alert('会員登録が出来ました。');
                    window.location.href = '/';
                })
                .catch(err => {
                    console.log('会員登録のエラー');
                });
        } else {
            alert('入力した情報が正しくありません。');
        }
    };

    const checkDuplicatedId = () => {
        const url = '/api/checkDuplicated-id?id=' + id;
        console.log(id);

        get(url)
            .then(res => {
                const isValid = res.data.length === 0 ? true : false;
                console.log(res.data, isValid);

                if (!isValid) {
                    alert('中腹のアカウントです。');
                    setIsValidAccount(false);
                }
            })
            .catch(() => {
                console.log('중복조회 실패');
            });
    };

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    useEffect(() => {
        const leng = id.length;
        if (leng !== null && leng !== undefined && leng > 0) {
            checkDuplicatedId();
        }
    }, [id]);

    return (
        <main>
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-slide-title'
                    aria-describedby='alert-dialog-slide-description'
                >
                    <DialogTitle id='alert-dialog-slide-title'>{'会員登録'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-slide-description'>
                            このサイトを利用するため、ログインあるいは会員登録をしてください。
                        </DialogContentText>
                        <TextField type='text' label='ID' name='id' onChange={valueChange} /> <br />
                        <TextField type='password' label='PASSWORD' name='password' onChange={valueChange} />
                        <TextField
                            type='password'
                            label='PASSWORD_CONFIRM'
                            name='password-confirm'
                            onChange={valueChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={signup} color='primary' onClick={signup}>
                            会員登録
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
