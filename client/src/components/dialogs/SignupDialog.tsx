import React, {useEffect, useState, ChangeEvent} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TextField} from '@material-ui/core';
import axios, {AxiosResponse} from 'axios';
import {TransitionProps} from '@material-ui/core/transitions';

// recoils
import {useRecoilState} from 'recoil';
import {lDOpenState, sDOpenState} from '../../_recoil';

// * Props Interface
interface PropsSignupDialog {
    loginDialogIsOpen: boolean;
    signupDialogIsOpen: boolean;
    handleSignupDialog(bools: boolean): void;
    handleLoginDialog(bools: boolean): void;
}

// * Container Component
export default function Container() {
    const [loginDialog, setLoginDialog] = useRecoilState(lDOpenState);
    const [signupDialog, setSignupDialog] = useRecoilState(sDOpenState);

    const handleLoginDialog = (bools: boolean) => {
        setLoginDialog(bools);
    };
    const handleSignupDialog = (bools: boolean) => {
        setSignupDialog(bools);
    };

    return (
        <SignupDialog
            loginDialogIsOpen={loginDialog}
            signupDialogIsOpen={signupDialog}
            handleSignupDialog={handleSignupDialog}
            handleLoginDialog={handleLoginDialog}
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

function SignupDialog(props: PropsSignupDialog) {
    let [id, setId] = useState('');
    let [pw, setPw] = useState('');
    let [pwCf, setPwCf] = useState('');
    let [isValidAccount, setIsValidAccount] = useState(true);

    const handleClose = () => {
        props.handleSignupDialog(false);
        props.handleLoginDialog(true);
    };

    const checkValidation = (value: string) => {
        let isValid = false;

        if (value.length <= 0) {
            alert('???????????????????????????????????????');
        } else if (value.length < 5) {
            alert('?????????????????????????????????');
        } else if (value.length > 60) {
            alert('????????????????????????????????????????????????????????????');
        } else {
            isValid = true;
        }

        return isValid;
    };

    const valueChange = (e: ChangeEvent<HTMLInputElement>) => {
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

        if (isValid && pwIsValid && isValidAccount) {
            const url = '/api/users/signup';
            const config = {
                headers: {
                    'content-type': 'application/json',
                },
            };
            const data = {
                STRING_ID: id,
                PASSWORD: pw,
            };

            axios
                .post(url, data, config)
                .then((res: AxiosResponse) => {
                    props.handleSignupDialog(false);
                    props.handleLoginDialog(true);
                    alert('?????????????????????????????????');
                })
                .catch(err => {
                    console.log('????????????????????????');
                });
        } else {
            alert('????????????????????????????????????????????????');
        }
    };

    const checkDuplicatedId = () => {
        const url = '/api/users/checkDuplicated-id?id=' + id;
        console.log(id);

        axios
            .get(url)
            .then((res: AxiosResponse) => {
                const isValid = res.data.length === 0 ? true : false;
                console.log(res.data, isValid);

                if (!isValid) {
                    alert('?????????????????????????????????');
                    setIsValidAccount(false);
                } else {
                    setIsValidAccount(true);
                }
            })
            .catch(() => {
                console.log('???????????? ??????');
            });
    };

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
                    open={props.signupDialogIsOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-slide-title'
                    aria-describedby='alert-dialog-slide-description'
                >
                    <DialogTitle id='alert-dialog-slide-title'>{'????????????'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-slide-description'>
                            ???????????????????????????????????????????????????????????????????????????????????????????????????
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
                        <Button onClick={signup} color='primary'>
                            ????????????
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
