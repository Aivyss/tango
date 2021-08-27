import './App.css';
import {useEffect} from 'react';
import LoginDialog from './containers/modules/LoginDialog';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './containers/pages/Home/Home';
import HomeTwo from './components/pages/Home/HomeTwo';

function App(props) {
    const userId = localStorage.getItem('primaryKey');
    const isLogined = props.isLogined;
    console.log('🚀 ~ file: App.js ~ line 11 ~ App ~ isLogined', isLogined);

    useEffect(() => {
        console.log(userId);
        props.handleLoginDialog(!userId && true);
    }, [userId]);

    return (
        <div className='App'>
            <BrowserRouter>
                {userId && isLogined ? (
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
