import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
// react-redux
import {Provider} from 'react-redux';
// redux-persist
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './_store';
import createTheme from '@material-ui/core/styles/createTheme';
import {ThemeProvider} from '@material-ui/styles';
const theme = createTheme({
    palette: {
        primary: {
            main: '#639ABA',
        },
        secondary: {
            main: '#5B676E',
        },
        inherit: {
            main: '#C7E1F0',
        },
        default: {
            main: '#7EC4ED',
        },
        quinary: {
            main: '#3B5D70',
        },
    },
});

const {store, persistor} = configureStore();
console.log('store ~', store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
