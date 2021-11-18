import React from 'react';
import ReactDOM from 'react-dom';
// wrappo la mia intera app con il provider in modo che redux sia disponibile in ogni componente
import {Provider} from 'react-redux'

import './index.css';
import App from './App';
//  importo lo store siccome React non ne è a conoscenza
import store from './store/index.js'

ReactDOM.render
(<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);
