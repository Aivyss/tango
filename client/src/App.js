import './App.css';
import {useEffect} from 'react';
import LoginDialog from './containers/modules/LoginDialog';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './containers/pages/Home/Home';
import HomeTwo from './components/pages/Home/HomeTwo';

function App(props) {
    const userId = sessionStorage.getItem('primaryKey');

    useEffect(() => {
        console.log(userId);
        props.handleLoginDialog(!userId && true);
    }, [userId]);

    return (
        <div className='App'>
            <BrowserRouter>
                {userId ? (
                    <Route path='/' component={Home} />
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
