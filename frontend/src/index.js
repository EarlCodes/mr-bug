import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/login/LoginPage';
import { store } from './api/store/Store';
import { Provider } from 'react-redux';
import RegisterPage from './pages/register/RegisterPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C7EF00',
    },
    secondary: {
      main: '#E5E5E5'
    },
    tertiary: {
      main: '#FA7E61'
    },
    black: {
      main: '#36413E'
    },
    greenish: {
      main: '#7B9E89'
    },
    light: {
      main: '#C4C4C4'
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/app' element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
