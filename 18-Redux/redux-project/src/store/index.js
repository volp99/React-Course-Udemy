import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice";

/* STORE
 configueStore è come createStore con la differenza che posso gestire multipli reducer
 */
const store = configureStore({
	reducer: {counter: counterReducer, auth: authReducer}
})
export default store;

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++/

 */
//  reducer senza react toolkit
/*
 const counterReducer = (state = initialState, action) => {
 if (action.type === 'increment') {
 return {
 counter: state.counter + 1,
 showCounter: state.showCounter
 }
 }
 if (action.type === 'decrement') {
 return {
 counter: state.counter - 1,
 showCounter: state.showCounter
 }
 }
 if (action.type === 'increase') {
 return {
 counter: state.counter + action.amount, //  aggiungo un payload
 showCounter: state.showCounter
 }
 }
 if (action.type === 'toggle') {
 return {
 showCounter: !state.showCounter,
 counter: state.counter
 }
 }
 return state;
 } */