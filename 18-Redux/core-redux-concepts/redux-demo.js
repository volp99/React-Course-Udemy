//  importo redux
const redux = require('redux');

//  creo il reducer
const counterReducer = (state = {counter: 0}, action) => {

	if (action.type === 'increment') {
		return {
			counter: state.counter + 1
		}
	}

	if (action.type === 'decrement') {
		return {
			counter: state.counter - 1
		}
	}
	return state;   //  ritorna lo state non cambiato
}

//  creo lo store
const store = redux.createStore(counterReducer);

//  creo la action
const counterSubscriber = () => {
	const latestState = store.getState()
	console.log(latestState)
}

//  eseguo
store.subscribe(counterSubscriber)

//  dispatch action
store.dispatch({type: 'increment'})
store.dispatch({type: 'decrement'})

// per eseguire: node redux-demo.js