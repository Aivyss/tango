import './App.css';
import {useEffect} from 'react';
import LoginDialog from './containers/modules/LoginDialog';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './containers/pages/Home/Home';
import HomeTwo from './components/pages/Home/HomeTwo';

import theme from './theme/theme';

function App(props) {
    const userId = sessionStorage.getItem('primaryKey');

    useEffect(() => {
        userId ? props.handleLoginDialog(false) : props.handleLoginDialog(true);
    }, [userId]);

    return (
        <div className='App'>
            <BrowserRouter>
                {sessionStorage.getItem('primaryKey') ? (
                    <Route path='/' component={() => <Home />} />
                ) : (
                    <div>
                        <HomeTwo />
                        <Route exact path='/'>
                            <LoginDialog />
                        </Route>
                    </div>
                )}
            </BrowserRouter>
        </div>
    );
}

export default App;
