import './App.css';
import {useEffect} from 'react';
import LoginDialog from './containers/modules/LoginDialog';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './containers/pages/Home/Home';
import HomeTwo from './components/pages/Home/HomeTwo';
import SignupDialog from './containers/modules/SignupDialog';

function App(props) {
    const userId = localStorage.getItem('primaryKey');
    const isLogined = props.isLogined;

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
                            <SignupDialog />
                        </Route>
                    </div>
                )}
            </BrowserRouter>
        </div>
    );
}

export default App;
