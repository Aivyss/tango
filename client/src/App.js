import './App.css';
import LoginDialog from './containers/modules/LoginDialog';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './containers/pages/Home/Home';
import HomeTwo from './components/pages/Home/HomeTwo';
import {useEffect, useState} from 'react';

function App(props) {
    let [isLogined, setIsLogined] = useState(props.isLogined);

    const changeLoginStatus = bools => {
        setIsLogined(bools);
    };

    const loginCheck = bools => {
        props.loginCheck(bools);
    };

    useEffect(() => {
        console.log('inifinite loof?');
        console.log(sessionStorage.getItem('id'));
        if (sessionStorage.getItem('id') !== null && sessionStorage.getItem('id') !== undefined) {
            loginCheck(true);
            setIsLogined(true);
        } else {
            loginCheck(false);
            setIsLogined(false);
        }
    }, [loginCheck]);

    return (
        <div className='App'>
            <BrowserRouter>
                {isLogined ? (
                    <Route path='/' component={() => <Home changeLoginStatus={changeLoginStatus} />} />
                ) : (
                    <div>
                        <HomeTwo />
                        <Route exact path='/'>
                            <LoginDialog changeLoginStatus={changeLoginStatus} />
                        </Route>
                    </div>
                )}
            </BrowserRouter>
        </div>
    );
}

export default App;
