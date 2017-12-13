import React,{ Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Bar from './Bar.js';
import RaisedButton from 'material-ui/RaisedButton';
import {
    HashRouter,
    Route,
    Redirect,
    Link
} from 'react-router-dom';
const style = {
  margin: 12,
};

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {open: false,selection:"login"};
  }
  handleClick(){
    this.setState({open:true,selection:"whiskey"});
  }
  render(){


    return(
      <div>
      <MuiThemeProvider>
      <TextField
      hintText="Username"
      /><br />
      <TextField
      hintText="Password Field"
      floatingLabelText="Password"
      type="password"
    /><br/>
      <RaisedButton label="Sign in" primary={true} style={style} onClick={this.handleClick.bind(this)}/>

      </MuiThemeProvider>
      </div>
    )
  }
}
export default Login;
