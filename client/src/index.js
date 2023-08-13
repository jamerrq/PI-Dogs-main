import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

// React Router
import { BrowserRouter } from 'react-router-dom';

// Axios defaults
import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.baseURL = 'https://pi-dogs-wrgc.onrender.com';


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
