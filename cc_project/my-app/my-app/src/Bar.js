import React, { Component } from 'react';
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
import Login from './Login.js';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FacebookLogin from 'react-facebook-login';
import GoogleSignIn from "react-google-signin";
import ActionHome from 'material-ui/svg-icons/action/home';
import SocialPerson from 'material-ui/svg-icons/social/person';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import Chip from 'material-ui/Chip';
import Amplify,{API} from 'aws-amplify';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const style = {
  margin: 12,
};
const tilesData = [
{
  img: require('./01-johnnie-walker-black-label.png'),
  id: 8,
  title: 'Black Label',
  price: '10.99',
  username:'',
  tier:1
},
{
  img: require('./chivas_regal_18_fl.png'),
  id:9,
  title: 'Chivas Regal',
  price: '15',
  username:'',
  tier:1
},

];

const tilesData1 = [
{
  img: require('./bacardi-black.png'),
  id:12,
  title: 'Bacardi',
  price: '10.99',
  username:'',
  tier:1
},
{
  img: require('./bacardi-superior.png'),
  id:11,
  title: 'Bacardi',
  price: '15',
  username:'',
  tier:1
},

];
const tilesData2 = [
{
  img: require('./armanddebrignacchampagne.png'),
  id:3,
  title: 'chamnpagne',
  price: '200',
  username:'',
  tier:1
},
{
  img: require('./PalMeyer-Char-NV-SM.png'),
  id:1,
  title: 'Chardonnay',
  price: '350',
  username:'',
  tier:1
},

];
const tilesData3 = [
{
  img: require('./Absolut_Lime_Bottle.jpg'),
  id:4,
  title: 'Absolut',
  price: '10.99',
  username:'',
  tier:1
},
{
  img: require('./Grey_Goose_vodka_bottle.png'),
  id:6,
  title: 'Bacardi',
  price: '15',
  username:'',
  tier:1
},

];
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop:'20px',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false,selection: "whiskey",name:"",namedisplay:false,disable:false,checkout:false};
    this.addCart = this.addCart.bind(this);
    this.removeCart = this.removeCart.bind(this);
    this.values=[];
  }


  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  handleClick(){
    this.setState({open:false,selection:"whiskey",name:this.state.name,namedisplay:true});
  }
  handlelogin(){
    this.setState({selection:"login",open:false})
  }
 handlewhiskey(){
   this.setState({selection:"whiskey",open:false})
 }
 handlerum(){
   this.setState({selection:"rum",open:false})
 }
 handlewine(){
   this.setState({selection:"wine",open:false})
 }
 handlevodka(){
   this.setState({selection:"vodka",open:false})
 }
 handlecart(){
   this.setState({selection:"cart",open:false})
 }
 addCart(event,value){
   console.log(event)
   event.username = this.state.name;
   this.values.push(event);
   this.setState({checkout:true});
 }
 removeCart(event,value){
   console.log(event)
   this.values.map((tile)=>
  (tile.title = event.title)?this.values.splice(this.values.indexOf(tile.title),1):console.log("not found"));
  this.forceUpdate();

  // this.values.splice();
 }
 checkoutCart(){
   console.log(this.values);
   let apiName = 'MyApiName';
let path = '/path';
let myInit = { // OPTIONAL
  headers: {'crossdomain':true,'content-type': 'application/json'},
  body : JSON.stringify({"data":this.values})
}
   let requestParams = {
            body : {"data":this.values},
            headers:{ "Access-Control-Allow-Origin" : "*"}
        }

        API.get('bar','https://t0eckzi2ll.execute-api.us-east-2.amazonaws.com/MobileHub_Deployments/items', requestParams)
            .then(data => {
                console.log(data);
            })
            .catch (err => console.log(err))
 }
 onSignIn(userProfile, accessToken) {
            console.log(userProfile)
        }

  signOut() {
      this.googleAuth.signOut();
  }
  getUsername(event,value){
    this.setState({name:value});

  }
  render() {
    const responseFacebook = (response) => {
     console.log(response);
   }
    var login = (this.state.selection === "login")?<div>
    <MuiThemeProvider>
   <TextField
    hintText="Username"
    onChange={this.getUsername.bind(this)}
    /><br />
    <TextField
    hintText="Password Field"
    floatingLabelText="Password"
    type="password"
  /><br/>
    <RaisedButton label="Sign in" primary={true} style={style} onClick={this.handleClick.bind(this)}/>
    <br/>
  {/*  <div style={{marginTop:'30px'}}>
   <FacebookLogin
    appId="188512938395974"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook} />
    </div>
    <br/>
    <div style={{marginLeft:'520px',marginTop:'30px'}}>
    <GoogleSignIn clientId="816508400741-koupkgd7h6rbpg9bvtrdp3b4fr0odcke.apps.googleusercontent.com"
            			  ref={g => this.googleAuth = g}
            			  onSuccess={this.onSignIn.bind(this)}
                />
  </div>*/}

    </MuiThemeProvider>
    </div>:<div/>
    var whiskey = (this.state.selection === "whiskey")?
    <div>
    <Chip style={{marginLeft:'45%'}} labelStyle={{fontSize:'30px'}}>
         Whiskey
       </Chip>
    <div style={styles.root}>
    <GridList
    cellHeight={180}
    style={styles.gridList}
    >
    {tilesData.map((tile) => (
       <GridTile
         key={tile.title}
         title={tile.title}
         username={this.state.username}
         subtitle={<span>by <b>{tile.price}</b></span>}
         actionIcon={<FloatingActionButton onClick={this.addCart.bind(tile,tile,this)} mini={true} style={style}>
      <ContentAdd />
    </FloatingActionButton>}

       >
         <img src={tile.img} />
       </GridTile>
     ))}
    </GridList>
    </div> </div>:<div/>;
    var rum =   (this.state.selection === "rum")?
    <div>
    <Chip style={{marginLeft:'45%'}} labelStyle={{fontSize:'30px'}}>
         Rum
       </Chip>
      <div style={styles.root}>
      <GridList
      cellHeight={180}
      style={styles.gridList}
      >
      {tilesData1.map((tile) => (
         <GridTile
           key={tile.title}
           title={tile.title}
           username={this.state.username}
           subtitle={<span>by <b>{tile.price}</b></span>}
           actionIcon={<FloatingActionButton onClick={this.addCart.bind(tile,tile,this)} mini={true} style={style}>
        <ContentAdd />
      </FloatingActionButton>}

         >
           <img src={tile.img} />
         </GridTile>
       ))}
      </GridList>
      </div></div>:<div/>;
      var wine =   (this.state.selection === "wine")?
      <div>
      <Chip style={{marginLeft:'45%'}} labelStyle={{fontSize:'30px'}}>
           Wine
         </Chip>
        <div style={styles.root}>
        <GridList
        cellHeight={180}
        style={styles.gridList}
        >
        {tilesData2.map((tile) => (
           <GridTile
             key={tile.title}
             title={tile.title}
             username={this.state.username}
             subtitle={<span>by <b>{tile.price}</b></span>}
             actionIcon={<FloatingActionButton onClick={this.addCart.bind(tile,tile,this)} mini={true} style={style}>
          <ContentAdd />
        </FloatingActionButton>}

           >
             <img src={tile.img} />
           </GridTile>
         ))}
        </GridList>
        </div></div>:<div/>;
        var vodka =   (this.state.selection === "vodka")?
        <div>
        <Chip style={{marginLeft:'45%'}} labelStyle={{fontSize:'30px'}}>
             Vodka
           </Chip>
          <div style={styles.root}>
          <GridList
          cellHeight={180}
          style={styles.gridList}
          >
          {tilesData3.map((tile) => (
             <GridTile
               key={tile.title}
               title={tile.title}
               username={this.state.username}
               subtitle={<span>by <b>{tile.price}</b></span>}
               actionIcon={<FloatingActionButton onClick={this.addCart.bind(tile,tile,this)} mini={true} style={style}>
            <ContentAdd />
          </FloatingActionButton>}

             >
               <img src={tile.img} />
             </GridTile>
           ))}
          </GridList>
          </div></div>:<div/>;
        var checkout = (this.state.checkout)?<RaisedButton onClick={this.checkoutCart.bind(this)}>Proceed to checkout</RaisedButton>:<div/>;
        var cart = (this.state.selection === "cart")?
        <div>
        <Chip style={{marginLeft:'45%'}} labelStyle={{fontSize:'30px'}}>
             Cart
           </Chip>
        <div style={styles.root}>
        <GridList
        cellHeight={180}
        style={styles.gridList}
        >
        {this.values.map((tile) => (
           <GridTile
             key={tile.title}
             title={tile.title}
             username={this.state.username}
             subtitle={<span>by <b>{tile.price}</b></span>}
             actionIcon={<FloatingActionButton onClick={this.removeCart.bind(tile,tile,this)} mini={true} style={style}>
          <ContentRemove />
        </FloatingActionButton>}

           >
             <img src={tile.img} />
           </GridTile>
         ))}
        </GridList>
        </div>
      {checkout}
        </div>:<div/>;

    var drawer = (this.state.selection === "login")? <Drawer docked={false}
    open={this.state.open}>
    <MenuItem onClick={this.handlelogin.bind(this)}>Login </MenuItem>
    <MenuItem onClick={this.handleClose}>Close </MenuItem>
    </Drawer>: <Drawer
    docked={false}
    open={this.state.open}>
    <MenuItem onClick={this.handlewhiskey.bind(this)}>Whiskey </MenuItem>
    <MenuItem onClick={this.handlewine.bind(this)}>Wine </MenuItem>
    <MenuItem onClick={this.handlerum.bind(this)}>Rum </MenuItem>
    <MenuItem onClick={this.handlevodka.bind(this)}>Vodka </MenuItem>
    <MenuItem onClick={this.handlecart.bind(this)}>Cart </MenuItem>
    <MenuItem onClick={this.handleClose}>Close </MenuItem>
    </Drawer>

    return (
      <div className="App">
      <MuiThemeProvider>
      <AppBar
      title="Virtual Bar"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      iconElementLeft = {

      <div>
        <IconButton onClick={this.handleToggle}><NavigationMenu /></IconButton>

        {drawer}

    </div>

    }
    iconElementRight={(this.state.namedisplay)?<div> <FlatButton label={this.state.name} icon={<SocialPerson />} /></div>:<div/>}


      />


        {whiskey}
        {rum}
        {wine}
        {vodka}
        {cart}

          </MuiThemeProvider>
      </div>
    );
  }
}

export default Bar;
