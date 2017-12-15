import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Bar from './Bar.js';
import {
    HashRouter,
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports.js';
import { withAuthenticator} from 'aws-amplify-react';

Amplify.configure(aws_exports);

// var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
// var hashHistory = ReactRouter.hashHistory;

class App extends Component {




  render() {

    return (
      <MuiThemeProvider>

        <BrowserRouter>
        <Switch>
        <Route path='/' component={Bar} username={this.props.username} />

        </Switch>
        </BrowserRouter>
      </MuiThemeProvider>

    );
  }
}

export default withAuthenticator(App,{inGreetings:true});
