import './App.css';
import LoginDialog from './containers/login/LoginDialog';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './containers/Home/Home';
import HomeTwo from './components/Home/HomeTwo';
import {useEffect, useState} from 'react';

function App(props) {
    let [isLogined, setIsLogined] = useState(props.isLogined);

    useEffect(() => {
        console.log('useEffect executed');
        if (sessionStorage.getItem('id') !== null && sessionStorage.getItem('id') !== undefined) {
            props.loginCheck(true);
            setIsLogined(true);
        } else {
            props.loginCheck(false);
            setIsLogined(false);
        }
    }, [props.isLogined]);

    return (
        <div className='App'>
            <BrowserRouter>
                {props.isLogined ? (
                    <Route exact path='/' component={Home} />
                ) : (
                    <div>
                        <HomeTwo />
                        <Route exact path='/' component={LoginDialog} />
                    </div>
                )}
            </BrowserRouter>
        </div>
    );
}

export default App;
