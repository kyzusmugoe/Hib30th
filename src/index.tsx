import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import WebService from './webService'
import WebServiceContext from './webService/WebServiceContext'

import store from './store'
import { Provider } from 'react-redux';

const ws = new WebService();

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<WebServiceContext.Provider value={{ webservice: ws }}>
				<App/>
			</WebServiceContext.Provider>
		</React.StrictMode>
	</Provider>
	, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//reportWebVitals();