import React, {Component} from 'react';
import Login from './Login'; 
import Signup from './Signup';

export class Auth extends Component{
    constructor(){
        super()

        this.state = {
            user: undefined, //needs to be moved to App
            token: localStorage.getItem("token"), //needs to be moved to App
            username: undefined,
            password:undefined
        }
        this.storeUser = this.storeUser.bind(this);
        this.storeToken = this.storeToken.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
          })
    }

    storeToken(token){
        console.log(token);
        this.setState({
            token
        })
          window.localStorage.setItem("token", token);
    }

    storeUser(user){
        this.setState({
            user
        })
    }

    render(){
        return(
            <div className="auth-container">
                <div className="auth-land-zone">
                    <div className="outter-container">
                        <h2>Signup</h2>
                        <Signup formFiller={this.onChange} username={this.state.username} password={this.state.password}/>
                        <h2>Login</h2>
                        <Login storeUser={this.storeUser} token={this.state.token} storeToken={this.storeToken} formFiller={this.onChange} username={this.state.username} password={this.state.password}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth;