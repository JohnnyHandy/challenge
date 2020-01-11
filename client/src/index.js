import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import {applyMiddleware,createStore,compose} from 'redux'
import thunk from 'redux-thunk'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer'


const persistConfig = {
    key: 'root',
    storage,
  }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose;

const persistedReducer = persistReducer(persistConfig, reducer)
let store = createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk)))
let persistor = persistStore(store)
  

ReactDOM.render(
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </PersistGate>
</Provider>
    
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
