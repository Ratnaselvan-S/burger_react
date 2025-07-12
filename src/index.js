import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore,applyMiddleware,compose,combineReducers } from '@reduxjs/toolkit'; 
import burgerBuilder from './store/reducers/burgerBuilder';
import { thunk } from 'redux-thunk';
import orders from './store/reducers/order'
import auth from './store/reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootreducer=combineReducers({
  burgerbuilder:burgerBuilder,
  order:orders,
  auth:auth

})
const store=configureStore({
  reducer: rootreducer,
},composeEnhancers(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Provider store={store}>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>

  </BrowserRouter>
  </Provider>
);
