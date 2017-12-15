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
import Checkbox from 'material-ui/Checkbox';
import Amplify,{API} from 'aws-amplify';
import {Greetings,Authenticator} from 'aws-amplify-react';
import DropDownMenu from 'material-ui/DropDownMenu';
import LocalDrink from 'material-ui/svg-icons/maps/local-drink';
import LocalBar from 'material-ui/svg-icons/maps/local-bar';
import LocalGroceryStore from 'material-ui/svg-icons/maps/local-grocery-store';
import Snackbar from 'material-ui/Snackbar';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import LexChat from "react-lex";
import App from './App.js';
import {
    HashRouter,
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import QRCode from 'qrcode.react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const style = {
  margin: 12,
};

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop:'20px',
  },
  gridList: {
    width: 500,
    height: 500,
    overflowY: 'auto',
  },
  gridList1: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false,selection: "whiskey",name:"",disable:false,checkout:false,signIn:true,drop:1,previousBottle:false,activeBottle:false,redeemedBottle:true,qrCoderedeem:false,opensnackbar:false,shop:false,openpop:false};
    this.addCart = this.addCart.bind(this);
    this.refreshCart = this.refreshCart.bind(this);
    this.removeCart = this.removeCart.bind(this);
    this.userProfile = this.userProfile.bind(this);
    this.getData = this.getData.bind(this);
    this.getBarsList = this.getBarsList.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handledata = this.handledata.bind(this);
    this.getBarId = this.getBarId.bind(this);
    this.values=[];
    this.username="";
    this.tilesData=[];
    this.tilesData1=[];
    this.tilesData2=[];
    this.tilesData3=[];
    this.value=0;
    this.userCurrentData=[];
    this.userRedeemData=[];
    this.userPreviousData=[];
    this.redeemData=[];
    this.bars1=[];
    this.bars2=[];
    this.redeemState=false;
    this.qrCode;
    this.qrCode2;
    this.barId=1;

  }
  componentWillMount(){
    this.getData();
    this.getBarsList();
  }
  handleUpdate(){
    this.userProfile();
    this.forceUpdate();
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});
  getData(){
    API.get('API Name','/Path').then(response=>{
      console.log(response)
       this.tilesData=(response.DrinksData.Whiskey);
       this.tilesData1=(response.DrinksData.Rum);
       this.tilesData2=(response.DrinksData.Wine);
       this.tilesData3=(response.DrinksData.Vodka);
       this.forceUpdate();
    });
  }
  getBarsList(){
    API.get('Api Name','/Path').then(response=>{
      console.log(response.bars)
      this.bars1=response.bars.Tier1;
      console.log(this.bars1)
    });
  }

  handleRequestClose(){
    this.setState({opensnackbar:false})
  }
 handlewhiskey(){
   this.setState({selection:"whiskey",open:false,shop:false})
 }
 handlerum(){
   this.setState({selection:"rum",open:false,shop:false})
 }
 handlewine(){
   this.setState({selection:"wine",open:false,shop:false})
 }
 handlevodka(){
   this.setState({selection:"vodka",open:false,shop:false})
 }
 handlecart(){
   this.setState({selection:"cart",open:false,shop:false})
 }
 handlechat(){
   this.setState({selection:"chat",open:false,shop:false})
 }
 handleusername(){
   this.setState({selection:"userprofile",open:false,shop:false})
   this.userProfile();
 }
 handleShop(){
   this.setState({selection:"whiskey",shop:false})
 }
 handledropDown(event,index,value){
   this.setState({drop:value});
   if(value!=this.value){
   if(this.value===1)
   this.values.map(d=>{return (d.Price=d.Price*value)});
   if(this.value===2)
   this.values.map(d=>{return (d.Price=d.Price/2)});
   if(this.value===0) {
     this.values.map(d=>{return (d.Price=d.Price*value)});
   }
   this.values.map(d=>{return (d.Tier= value)});
   this.value=value;
 }
   // this.forceUpdate();

 }
 handleClick(event){
   event.preventDefault();
   this.setState({
      openpop: true,anchorEl: event.currentTarget});
 }
 handleRequestClosePop(){
    this.setState({
      openpop: false,
    });
  };
 handleCheckBox(event,index){
  (this.redeemData.length>0)?(this.redeemData.indexOf(event))?this.redeemData.push(event):this.redeemData.splice(this.redeemData.indexOf(event.BottleID),1):this.redeemData.push(event);

 }
 handlePreviousbottle(){
   this.setState({previousBottle:!this.state.previousBottle})
 }
 handleActivebottle(){
   this.setState({activeBottle:!this.state.activeBottle})
 }
 handleReedemedbottle(){
   this.setState({reedemedBottle:!this.state.reedemedBottle})
 }
 handleuseCode(){
   this.setState({qrCoderedeem:!this.state.qrCoderedeem,selection:"whiskey"})
   this.redeemData=[];
   this.qrCode=[];
   this.qrCode2=[];
   this.forceUpdate();
 }
 handledata(event,index){
   var data =  [];
   data.push(event);
   data.map(d=>(d.username=this.username));
  data.map(d=>(d.BarID=this.barId));
    console.log(data);
    let requestParams = {
             body : {"data":data},
         }
    API.post('API Name','/Path',requestParams)
      .then(data=>{console.log(data)})
  this.setState({qrCoderedeem:true});
  this.qrCode2 = data.map(d=>{return (<div><QRCode value={d.BottleID+d.Quantity} /><div>{d.Name}<br/>Price:{d.Price}<br/>Pegs:{d.Quantity}</div><br/><br/></div>)})
 }
 getBarId(event,index){
   console.log(event);
   this.barId = event.BarID;
   console.log(this.barId);
   this.setState({openpop:false});

 }

 addCart(event,value){
   event.username = this.username;
   this.values.push(event);
   console.log(this.values);
   this.setState({checkout:true,opensnackbar:true});
 }
 removeCart(event,value){
   this.values.map(d=>{return (d.Price=d.Price/this.value)});
   this.value=0;
   console.log(event)
   this.setState({opensnackbar:true,shop:true})
  this.values.map((tile)=>
  (tile.Name == event.Name)?this.values.splice(this.values.indexOf(tile.Name),1):console.log("not found"));
  (this.values.length===0)?this.setState({checkout:false}):<div/>
  this.forceUpdate();

  // this.values.splice();
 }
 refreshCart(){
  this.values.map(d=>{return (d.Price=d.Price/this.value)});
   this.values=[];
   this.value=0;
   this.setState({checkout:false,opensnackbar:true})
  this.forceUpdate();
  this.handleusername();

   console.log(this.values);
   // this.forceUpdate();

 }
 checkoutCart(){
   this.setState({drop:1})
   let requestParams = {
            body : {"data":this.values},
        }

        API.post('API Name','/Path', requestParams)
            .then(data => {
                console.log(data);
            })
            .catch (err => console.log(err))
  this.refreshCart();

 }
 userProfile(){

   let requestParams = {
            body : {"username":this.username},
        }

        API.post('API Name','/Path', requestParams)
            .then(data => {
                console.log(data);
                this.userCurrentData = data.Bottles.current;
                this.userPreviousData = data.Bottles.previous;
                this.userRedeemData = data.Bottles.redeemed;
                this.forceUpdate();
            })
            .catch (err => console.log(err))


 }
redeem(){
  this.redeemData.map(d=>{d.username = this.username})
  this.redeemData.map(d=>{d.BarID = this.barId})
  let requestParams = {
           body : {"data":this.redeemData},
       }

  this.redeemState= true;
  this.qrCode = this.redeemData.map(d=>{return (<div><QRCode value={d.BottleID+d.Quantity} /><div>{d.Name}<br/>Price:{d.Price}<br/>Pegs:{d.Quantity}</div><br/><br/></div>)})
  API.post('API Name','/Path',requestParams)
    .then(data=>{})
  this.setState({qrCoderedeem:true})
    this.forceUpdate();
}

  render() {
    var bars = (this.bars1.map((d)=>(

      <MenuItem primaryText={d.Name} onClick={this.getBarId.bind(d,d,this)} />

    )))
    var shopButton = (this.state.shop || !this.state.checkout)?<div><RaisedButton label="Shop" onClick={this.handleShop.bind(this)} primary={true} style={{margin:12}} /></div>:<div/>
    var code = (this.state.qrCoderedeem)?<div><RaisedButton label="Use Code" onClick={this.handleuseCode.bind(this)} primary={true} style={{margin:12}} />
</div>:<div/>
    var previous= (this.state.previousBottle)?<div style={styles.root}>
    <GridList style={styles.gridList1} cols={2.2}>
      {this.userPreviousData.map((tile) => (
        <GridTile
          key={tile.DrinkID}
          title={tile.Name}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          subtitle={<span>Pegs: <b>{tile.Quantity}</b></span>}

        >
          <img src={"s3-url"+tile.Url} />
        </GridTile>
      ))}
    </GridList></div>:<div/>
    var active= (this.state.activeBottle)?<div style={styles.root}>
    <GridList style={styles.gridList1} cols={2.2}>
      {this.userCurrentData.map((tile) => (
        <GridTile
          key={tile.DrinkID}
          title={tile.Name}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          subtitle={<span>Pegs: <b>{tile.Quantity}</b></span>}
          actionIcon={<Checkbox onCheck={this.handleCheckBox.bind(tile,tile,this)}/>}

        >
          <img src={"s3-url"+tile.Url} />
        </GridTile>
      ))}
    </GridList><div> <RaisedButton label="Redeem" onClick={this.redeem.bind(this)}  primary={true} style={style} />  {code}</div></div>:<div/>
    var redeem= (this.state.redeemedBottle)?  <div style={styles.root}>
      <GridList style={styles.gridList1} cols={2.2}>
        {this.userRedeemData.map((tile) => (
          <GridTile
            key={tile.DrinkID}
            title={tile.Name}
            titleStyle={styles.titleStyle}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            subtitle={<span>Pegs: <b>{tile.Quantity}</b></span>}
            actionIcon={<RaisedButton label="Code" primary={true} onClick={this.handledata.bind(tile,tile,this)} style={{minWidth:'0px',marginTop:'20px'}} />}

          >
            <img src={"s3-url"+tile.Url} />
          </GridTile>
        ))}
      </GridList>
      </div>:<div/>
    var userprofile= (this.state.selection === "userprofile")?
    <div>
    <div>
    <RaisedButton
          onClick={this.handleClick.bind(this)}
          label="Bar List"
          primary={true}
        />
        <Popover
          open={this.state.openpop}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClosePop.bind(this)}
          animation={PopoverAnimationVertical}
        >
        <Menu>
          {bars}
        </Menu>
        </Popover>
      </div>
    <RaisedButton
         label="Previous Bottles"
         primary={true}
         style={{margin:12}}
         icon={<LocalBar/>}
         onClick={this.handlePreviousbottle.bind(this)}
       />
       {previous}
    <RaisedButton
         label="Active Bottles"
         primary={true}
         style={{margin:12}}
         icon={<LocalBar/>}
         onClick={this.handleActivebottle.bind(this)}
       />
       {active}
       {this.qrCode}
    <RaisedButton
         label="Redeemed Bottles"
         primary={true}
         style={{margin:12}}
         icon={<LocalBar/>}
         onClick={this.handleReedemedbottle.bind(this)}
       />
      {redeem}
      {code}
      {this.qrCode2}



  </div>
    :<div/>
    var whiskey = (this.state.selection === "whiskey")?
    <div>
    <RaisedButton
         label="Whiskey"
         primary={true}
         style={{margin:12}}
         icon={<LocalDrink/>}
       />
       <div style={{marginLeft:'50%',marginTop:'-60px'}}>
       <IconButton tooltip="Cart" onClick={this.handlecart.bind(this)}>
       <LocalGroceryStore />
     </IconButton>
     </div>
    <div style={styles.root}>
    <GridList
    cellHeight={180}
    style={styles.gridList}
    >
    {this.tilesData.map((tile) => (
       <GridTile
         key={tile.Id}
         title={tile.Name}
         username={this.username}
         subtitle={<span><b>${tile.Price}</b><b style={{marginLeft:'20px'}}>20 Oz</b></span>}
         actionIcon={<FloatingActionButton onClick={this.addCart.bind(tile,tile,this)} mini={true} style={style}>
      <ContentAdd />
    </FloatingActionButton>}

       >
         <img src={"s3-url"+tile.Url} />
       </GridTile>
     ))}
    </GridList>
    </div> <Snackbar
          open={this.state.opensnackbar}
          message="Added to Cart"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose.bind(this)}
        /> </div>:<div/>;
    var rum =   (this.state.selection === "rum")?
    <div>
    <RaisedButton
         label="Rum"
         primary={true}
         style={{margin:12}}
         icon={<LocalDrink/>}
       />
       <div style={{marginLeft:'50%',marginTop:'-60px'}}>
       <IconButton tooltip="Cart" onClick={this.handlecart.bind(this)}>
       <LocalGroceryStore />
     </IconButton>
     </div>
      <div style={styles.root}>
      <GridList
      cellHeight={180}
      style={styles.gridList}
      >
      {this.tilesData1.map((tile) => (
         <GridTile
           key={tile.Id}
           title={tile.Name}
           username={this.username}
           subtitle={<span><b>${tile.Price}</b><b style={{marginLeft:'20px'}}>20 Oz</b></span>}
           actionIcon={<FloatingActionButton onClick={this.addCart.bind(tile,tile,this)} mini={true} style={style}>
        <ContentAdd />
      </FloatingActionButton>}

         >
           <img src={"s3-url"+tile.Url} />
         </GridTile>
       ))}
      </GridList>
      </div><Snackbar
            open={this.state.opensnackbar}
            message="Added to Cart"
            autoHideDuration={2000}
            onRequestClose={this.handleRequestClose.bind(this)}
          /></div>:<div/>;
      var wine =   (this.state.selection === "wine")?
      <div>
      <RaisedButton
           label="Wine"
           primary={true}
           style={{margin:12}}
           icon={<LocalBar/>}
         />
         <div style={{marginLeft:'50%',marginTop:'-60px'}}>
         <IconButton tooltip="Cart" onClick={this.handlecart.bind(this)}>
         <LocalGroceryStore />
       </IconButton>
       </div>
        <div style={styles.root}>
        <GridList
        cellHeight={180}
        style={styles.gridList}
        >
        {this.tilesData2.map((tile) => (
           <GridTile
             key={tile.Id}
             title={tile.Name}
             username={this.username}
             subtitle={<span><b>${tile.Price}</b><b style={{marginLeft:'20px'}}>20 Oz</b></span>}
             actionIcon={<FloatingActionButton onClick={this.addCart.bind(tile,tile,this)} mini={true} style={style}>
          <ContentAdd />
        </FloatingActionButton>}

           >
             <img src={"s3-url"+tile.Url} />
           </GridTile>
         ))}
        </GridList>
        </div><Snackbar
              open={this.state.opensnackbar}
              message="Added to Cart"
              autoHideDuration={2000}
              onRequestClose={this.handleRequestClose.bind(this)}
            /></div>:<div/>;
        var vodka =   (this.state.selection === "vodka")?
        <div>
        <RaisedButton
             label="Vodka"
             primary={true}
             style={{margin:12}}
             icon={<LocalDrink/>}
           />
           <div style={{marginLeft:'50%',marginTop:'-60px'}}>
           <IconButton tooltip="Cart" onClick={this.handlecart.bind(this)}>
           <LocalGroceryStore />
         </IconButton>
         </div>
          <div style={styles.root}>
          <GridList
          cellHeight={180}
          style={styles.gridList}
          >
          {this.tilesData3.map((tile) => (
             <GridTile
               key={tile.Id}
               title={tile.Name}
               username={this.username}
               subtitle={<span><b>${tile.Price}</b><b style={{marginLeft:'20px'}}>20 Oz</b></span>}
               actionIcon={<FloatingActionButton onClick={this.addCart.bind(tile,tile,this)} mini={true} style={style}>
            <ContentAdd />
          </FloatingActionButton>}

             >
               <img src={"s3-url"+tile.Url} />
             </GridTile>
           ))}
          </GridList>
          </div><Snackbar
                open={this.state.opensnackbar}
                message="Added to Cart"
                autoHideDuration={2000}
                onRequestClose={this.handleRequestClose.bind(this)}
              /></div>:<div/>;
        var checkout = (this.state.checkout)?<RaisedButton label="Proceed to checkout" primary={true} onClick={this.checkoutCart.bind(this)}></RaisedButton>:<div/>;
        var cart = (this.state.selection === "cart")?
        <div>
        <RaisedButton
             label="Cart"
             primary={true}
             style={{margin:12}}
             icon={<LocalGroceryStore/>}
           />
           {shopButton}
       <DropDownMenu value={this.state.drop} onChange={this.handledropDown.bind(this)}>
         <MenuItem value={1} primaryText="Tier-1" />
         <MenuItem value={2} primaryText="Tier-2" />
       </DropDownMenu>
        <div style={styles.root}>
        <GridList
        cellHeight={180}
        style={styles.gridList}
        >
        {this.values.map((tile) => (
           <GridTile
             key={tile.Id}
             title={tile.Name}
             username={this.username}
             subtitle={<span><b>${tile.Price}</b><b style={{marginLeft:'20px'}}>20 Oz</b></span>}
             actionIcon={<FloatingActionButton onClick={this.removeCart.bind(tile,tile,this)} mini={true} style={style}>
          <ContentRemove />
        </FloatingActionButton>}

           >
             <img src={"s3-url"+tile.Url} />
           </GridTile>
         ))}
        </GridList>
        </div>
        <Snackbar
              open={this.state.opensnackbar}
              message="Removed from Cart"
              autoHideDuration={2000}
              onRequestClose={this.handleRequestClose.bind(this)}
            />
      {checkout}
        </div>:<div/>;

    var chat = (this.state.selection === "chat")?<LexChat botName="NearestBars"
                 IdentityPoolId="Cognito-User-IdentityPoolId-ID"
                 placeholder="Placeholder text"
                 style={{position: 'absolute'}}
                 backgroundColor="#FFFFFF"
                 headerText="Chat with our awesome bot" />:<div/>
    var drawer =  <Drawer
    docked={false}
    open={this.state.open}>
    <MenuItem onClick={this.handleusername.bind(this)} leftIcon={<FlatButton label={this.username} icon={<SocialPerson />} />}></MenuItem>
    <MenuItem onClick={this.handlewhiskey.bind(this)}>Whiskey </MenuItem>
    <MenuItem onClick={this.handlewine.bind(this)}>Wine </MenuItem>
    <MenuItem onClick={this.handlerum.bind(this)}>Rum </MenuItem>
    <MenuItem onClick={this.handlevodka.bind(this)}>Vodka </MenuItem>
    <MenuItem onClick={this.handlecart.bind(this)}>Cart </MenuItem>
    <MenuItem onClick={this.handlechat.bind(this)}>Chat</MenuItem>
    <MenuItem onClick={this.handleClose}>Close </MenuItem>
    <MenuItem>    <Greetings inGreeting={(username)=>{this.username=username}}/></MenuItem>
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




      />

        {userprofile}
        {whiskey}
        {rum}
        {wine}
        {vodka}
        {cart}
        {chat}
          </MuiThemeProvider>

      </div>
    );
  }
}

export default Bar;
