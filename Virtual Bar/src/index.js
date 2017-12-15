import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppWithAuth from './AppWithAuth';
import registerServiceWorker from './registerServiceWorker';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';


Amplify.configure(aws_exports);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
