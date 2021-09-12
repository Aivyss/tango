import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Home from './components/pages/home/Home';
import HomeTwo from './components/pages/home/HomeTwo';
import LoginDialog from './components/dialogs/LoginDialog';
import SignupDialog from './components/dialogs/SignupDialog';

// recoils
import {useRecoilState} from 'recoil';
import {isLoginedState, lDOpenState, sDOpenState} from './_recoil/index';

interface AppProps {
    handleLoginDialog(bools: boolean): void;
    handleSignUpDialog(bools: boolean): void;
    doLogin(bools: boolean): void;
    isLogined: boolean;
    loginDialogIsOpen: boolean;
    signupDialogIsOpen: boolean;
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
        <App
            handleLoginDialog={handleLoginDialog}
            handleSignUpDialog={handleSignUpDialog}
            doLogin={handleLogin}
            isLogined={isLogined}
            loginDialogIsOpen={loginDialog}
            signupDialogIsOpen={signupDialog}
        />
    );
}

// * Presentational Component
function App(props: AppProps) {
    const userId = localStorage.getItem('primaryKey');
    const isLogined = props.isLogined;

    useEffect(() => {
        console.log(userId);
        props.handleLoginDialog(!userId && true);
    }, [userId]);

    return (
        <div>
            <BrowserRouter>
                {userId ? (
                    <Route path='/'>
                        <Home />
                    </Route>
                ) : (
                    <div>
                        <Route exact path='/'>
                            <HomeTwo />
                            <LoginDialog />
                            <SignupDialog />
                        </Route>
                    </div>
                )}
            </BrowserRouter>
        </div>
    );
}
