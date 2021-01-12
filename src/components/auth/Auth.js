import React, {Component} from 'react';
import Login from './Login'; 
import Signup from './Signup';
import TwoFactorAuth from './TwoFactorAuth';

export class Auth extends Component{
    constructor(){
        super()
        
        this.state = {
            username: undefined,
            password:undefined,
            email: undefined,
            auth1: false
        }
        this.onChange = this.onChange.bind(this);
        this.toggleAuth1 = this.toggleAuth1.bind(this);
    }

    //handles form to state updates
    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
          })
    }

    //toggles between first auth page and twoFactor Component
    toggleAuth1(){
        console.log("Attempting to change state...");
        this.setState({
            auth1: true
        })
    }

    render(){
        return(
            <div className="auth-land-zone">
                <div className="auth-container">
                    <div className="outter-container">  
                        {this.state.auth1 ? 
                            <TwoFactorAuth storeUser={this.props.storeUser} token={this.props.token} storeToken={this.props.storeToken} username={this.state.username} password={this.state.password} formFiller={this.onChange} />
                        :
                            <div>
                                <h2>Signup</h2>
                                <Signup formFiller={this.onChange} email={this.state.email} username={this.state.username} password={this.state.password}/>
                                <h2>Login</h2>
                                <Login toggleAuth1={this.toggleAuth1} storeUser={this.props.storeUser} token={this.props.token} storeToken={this.props.storeToken} formFiller={this.onChange} username={this.state.username} password={this.state.password}/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth;