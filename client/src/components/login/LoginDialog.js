import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import SignupDialog from '../signup/SignupDialog';
import {TextField} from '@material-ui/core';
import {post} from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function LoginDialog(props) {
    const [open, setOpen] = React.useState(true);
    const [signupOpen, setSignupOpen] = React.useState(false);
    const [id, setId] = React.useState('');
    const [pw, setPw] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSignupOpen(false);
    };

    const signup = () => {
        setOpen(false);
        setSignupOpen(true);
    };

    const handleFormSubmit = e => {
        e.preventDefault();

        const loginProcess = () => {
            const url = '/api/login';
            const formData = new FormData();
            const config = {
                'content-type': 'application/json',
            };

            formData.append('id', id);
            formData.append('password', pw);

            post(url, formData, config);
        };

        if (id.length > 0 && pw.length > 0) {
            loginProcess()
                .then(res => {
                    if (res.data.STRING_ID === id && res.data.PASSWORD === pw) {
                        console.log('로그인 성공');
                        sessionStorage.setItem('id', res.data.STRING_ID);
                        sessionStorage.setItem('primaryKey', res.data.ID);
                    } else {
                        setId('');
                        setPw('');
                        alert('ログインができませんでした。');
                    }
                })
                .catch(() => {
                    console.log('ログインエラー');
                });
        } else {
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
                open={open}
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
                    <TextField type='text' label='PASSWORD' name='password' onChange={checkPwValidation} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFormSubmit} color='primary'>
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
