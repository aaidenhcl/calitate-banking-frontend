import './App.css';
import Auth from './components/auth/Auth';
import Index from './components/index/Index';
import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';


//router will be implemented here
//HIGHES LEVEL OF STATE HERE
export class App extends React.Component {
  constructor(){
    super()

    this.state={
      user: undefined, //needs to be moved to App
      token: localStorage.getItem("token"), //needs to be moved to App
  
    }

    //bind functions here
    this.storeUser = this.storeUser.bind(this);
    this.storeToken = this.storeToken.bind(this);
  }

  storeUser(user){
    this.setState({
        user
    })
    window.localStorage.setItem("username", user.username);
  }

storeToken(token){
  console.log(token);
  this.setState({
      token
  })
    if(localStorage.getItem("token")){
      localStorage.removeItem("token");
    }
    window.localStorage.setItem("token", token);
  }

  //Feel free to add any routes to this router! :) 
  render(){
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Index 
                token={this.state.token}
                // storeToken={this.storeToken} 
                // storeUser={this.storeUser}
              />
            </Route>
            <Route exact path="/auth" render={(props) =>(
              <Auth 
                token={this.state.token}
                storeToken={this.storeToken} 
                storeUser={this.storeUser}
              />
            )}>               
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
