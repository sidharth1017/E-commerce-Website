import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, productDetailsReducers, productReducers } from './reducers/productReducers';

const reducer = combineReducers({
    products: productReducers,
    productDetails: productDetailsReducers,
    newProduct: newProductReducer,
});

let initialState = {} ;

// const middleware = [thunk];

export const store = configureStore({
    reducer,
    initialState,
    composeWithDevTools
});
