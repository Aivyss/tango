import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import SignupDialog from './SignupDialog';
import {TextField} from '@material-ui/core';
import {post} from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function LoginDialog(props) {
    const [signupOpen, setSignupOpen] = React.useState(false);
    const [id, setId] = React.useState('');
    const [pw, setPw] = React.useState('');

    const handleClickOpen = () => {};

    const handleClose = () => {
        props.closeLoginDislog();
    };

    const signup = () => {
        setSignupOpen(true);
    };

    const doLoginProcess = () => {
        if (id.length > 0 && pw.length > 0) {
            const url = '/api/users/login';

            const data = {
                STRING_ID: id,
                PASSWORD: pw,
            };

            const config = {
                headers: {
                    'content-type': 'application/json',
                },
            };

            post(url, data, config)
                .then(res => {
                    if (res.data[0].STRING_ID === id && res.data[0].PASSWORD === pw) {
                        localStorage.setItem('id', res.data[0].STRING_ID);
                        localStorage.setItem('primaryKey', res.data[0].ID);
                        handleClose(); // 모달 닫기
                        props.doLogin(true); // 리덕스 반영
                    } else {
                        setId('');
                        setPw('');
                        props.doLogin(false);
                        props.changeLoginStatus(false);
                        alert('ログインができませんでした。');
                    }
                })
                .catch(error => {
                    console.log(error);
                    props.doLogin(false);
                    console.log('ログインエラー');
                });
        } else {
            props.doLogin(false);
            alert('ログイン情報を入力してください。');
        }
    };

    const checkIdValidation = e => {
        const typedId = e.target.value;
        const STRING_LENGTH = 60;

        if (typedId.length > STRING_LENGTH) {
            alert(`IDの文字列の数は${STRING_LENGTH}以下です。`);
        } else {
            setId(typedId);
        }
    };

    const checkPwValidation = e => {
        const typedPw = e.target.value;
        const STRING_LENGTH = 60;

        if (typedPw.length > STRING_LENGTH) {
            alert(`PWの文字列の数は${STRING_LENGTH}以下です。`);
        } else {
            setPw(typedPw);
        }
    };

    return (
        <div>
            <Dialog
                open={props.loginDialogIsOpen && !props.isLogined}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby='alert-dialog-slide-title'
                aria-describedby='alert-dialog-slide-description'
            >
                <DialogTitle id='alert-dialog-slide-title'>{'Login or Sign-up'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        このサイトを利用するため、ログインあるいは会員登録をしてください。
                    </DialogContentText>
                    <TextField type='text' label='ID' name='id' onChange={checkIdValidation} /> <br />
                    <TextField type='password' label='PASSWORD' name='password' onChange={checkPwValidation} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={doLoginProcess} color='primary'>
                        Login
                    </Button>
                    <Button onClick={signup} color='primary'>
                        会員登録
                    </Button>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <SignupDialog open={signupOpen} />
        </div>
    );
}
