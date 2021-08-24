import './App.css';
import LoginDialog from './containers/modules/LoginDialog';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './containers/pages/Home/Home';
import HomeTwo from './components/pages/Home/HomeTwo';
import {ThemeProvider} from '@material-ui/styles';
import theme from './theme/theme';

function App(props) {
    return (
        <div className='App'>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    {props.isLogined ? (
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
            </ThemeProvider>
        </div>
    );
}

export default App;
