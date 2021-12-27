import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
	apiKey: 'AIzaSyBG0V7ALWY5Dz5WTVXGfTXZIQNeeRaOGzQ',
	authDomain: 'esp32-cam-c0916.firebaseapp.com',
	databaseURL: 'https://esp32-cam-c0916-default-rtdb.firebaseio.com',
	projectId: 'esp32-cam-c0916',
	storageBucket: 'esp32-cam-c0916.appspot.com',
	messagingSenderId: '644369239348',
	appId: '1:644369239348:web:44a4e786343778967a6961',
	measurementId: 'G-H81RFMW8QY'
};

ReactDOM.render(
	<FirebaseAppProvider firebaseConfig={firebaseConfig}>
		<ColorModeScript />
		<App />
	</FirebaseAppProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
