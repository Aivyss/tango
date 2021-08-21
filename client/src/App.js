import './App.css';
import LoginDialog from './components/login/LoginDialog';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import {useEffect, useState} from 'react';

function App() {
    const [isLogined, setIsLogined] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('id') !== null && sessionStorage.getItem('id') !== undefined) {
            setIsLogined(true);
        }
        console.log('useEffect executed');
        console.log(sessionStorage.getItem('id'));
    }, []);

    return (
        <div className='App'>
            <BrowserRouter>
                {isLogined ? (
                    <Route exact path='/' component={Home} />
                ) : (
                    <Route exact path='/' component={LoginDialog} />
                )}
            </BrowserRouter>
        </div>
    );
}

export default App;
