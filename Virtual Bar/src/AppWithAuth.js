import React, { Component } from 'react';
import App from './App.js';
import { Authenticator,Greetings } from 'aws-amplify-react';
class AppWithAuth extends Component {
  render(){

    return(
      <div>
      <Authenticator hideDefault={true} >
        <App/>
      </Authenticator>
      </div>
    );
  }
}
export default AppWithAuth;
