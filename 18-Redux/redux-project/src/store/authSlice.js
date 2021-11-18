import {createSlice} from "@reduxjs/toolkit";

// AUTHENTICATION
const initialAuthState = {isAuthenticated: false}

const authSlice = createSlice({
	name: 'authentication',
	initialState: initialAuthState,
	reducers: {
		login(state) {
			state.isAuthenticated = true
		},
		logout(state) {
			state.isAuthenticated = false
		}
	}
})

//  Esporto le actions, non c'è bisogno che le definica, react toolkit fa tutto da solo
export const authActions = authSlice.actions;

export default authSlice.reducer;