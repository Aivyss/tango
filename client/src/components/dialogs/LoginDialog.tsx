import React, {ChangeEvent} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import {TextField} from '@material-ui/core';
import {AxiosResponse} from 'axios';
import axios, {AxiosRequestConfig} from 'axios';

// recoils
import {useRecoilState} from 'recoil';
import {isLoginedState, lDOpenState, sDOpenState} from '../../_recoil';

// * Props interface
interface PropsLoginDialog {
    handleLoginDialog(bools: boolean): void;
    handleSignupDialog(bools: boolean): void;
    doLogin(bools: boolean): void;
    loginDialogIsOpen: boolean;
    isLogined: boolean;
}

// * Container Component
export default function Container() {
    const [isLogined, setIsLogined] = useRecoilState(isLoginedState);
    const [loginDialog, setLoginDialog] = useRecoilState(lDOpenState);
    const [signupDialog, setSignupDialog] = useRecoilState(sDOpenState);

    const handleLoginDialog = (bools: boolean) => {
        setLoginDialog(bools);
    };
    const handleSignUpDialog = (bools: boolean) => {
        setSignupDialog(bools);
    };
    const handleLogin = (bools: boolean) => {
        setIsLogined(bools);
    };

    return (
        <LoginDialog
            handleLoginDialog={handleLoginDialog}
            handleSignupDialog={handleSignUpDialog}
            doLogin={handleLogin}
            loginDialogIsOpen={loginDialog}
            isLogined={isLogined}
        />
    );
}

// * Presentational Component
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {children?: React.ReactElement<any, any>},
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function LoginDialog(props: PropsLoginDialog) {
    const [id, setId] = React.useState('');
    const [pw, setPw] = React.useState('');

    const handleClose = () => {
        props.handleLoginDialog(false);
    };

    const signup = () => {
        props.handleSignupDialog(true);
        props.handleLoginDialog(false);
    };

    const doLoginProcess = () => {
        if (id.length > 0 && pw.length > 0) {
            const url = '/api/users/login';

            const data = {
                STRING_ID: id,
                PASSWORD: pw,
            };

            const config: AxiosRequestConfig = {
                headers: {
                    'content-type': 'application/json',
                },
            };

            axios
                .post(url, data, config)
                .then((res: AxiosResponse) => {
                    if (res.data) {
                        // success login
                        localStorage.setItem('id', res.data.STRING_ID);
                        localStorage.setItem('primaryKey', res.data.ID);
                        handleClose(); // modal close
                        props.doLogin(true); // change state
                    } else {
                        setId('');
                        setPw('');
                        props.doLogin(false);
                        alert('ログインができませんでした。');
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    props.doLogin(false);
                    console.log('ログインエラー');
                });
        } else {
            props.doLogin(false);
            alert('ログイン情報を入力してください。');
        }
    };

    const checkIdValidation = (e: ChangeEvent<HTMLInputElement>) => {
        const typedId = e.target.value;
        const STRING_LENGTH = 60;

        if (typedId.length > STRING_LENGTH) {
            alert(`IDの文字列の数は${STRING_LENGTH}以下です。`);
        } else {
            setId(typedId);
        }
    };

    const checkPwValidation = (e: ChangeEvent<HTMLInputElement>) => {
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
        </div>
    );
}
