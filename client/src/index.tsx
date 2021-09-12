import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ThemeProvider} from 'styled-components';
import theme from './assets/styles/theme';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from 'recoil';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </ThemeProvider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
