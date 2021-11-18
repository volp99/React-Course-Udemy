import {createSlice} from "@reduxjs/toolkit";

//  COUNTER
const initialCounterState = {counter: 0, showCounter: true}

const counterSlice = createSlice({  //  createSlice crea automaticamente action identifier per i differenti reducer
	name: 'counter',
	initialState: initialCounterState,
	reducers: {
		increment(state) {
			state.counter++;
		},
		decrement(state) {
			state.counter--;
		},
		increase(state, action) {
			state.counter = state.counter + action.payload;
		},
		toggleCounter(state) {
			state.showCounter = !state.showCounter
		}
	}
})

//  Esporto le actions, non c'è bisogno che le definica, react toolkit fa tutto da sol
export const counterActions = counterSlice.actions;

export default counterSlice.reducer;