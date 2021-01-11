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
            auth1: false
        }
        this.onChange = this.onChange.bind(this);
        this.renderAuth1 = this.renderAuth1.bind(this);
        this.toggleAuth1 = this.toggleAuth1.bind(this);

    }

    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
          })
    }

    toggleAuth1(){
        console.log("Attempting to change state...");
        this.setState({
            auth1: true
        })
    }

    renderAuth1(){
        return(
        <div className="auth-land-zone">
            <div className="outter-container">
                <h2>Signup</h2>
                <Signup formFiller={this.onChange} username={this.state.username} password={this.state.password}/>
                <h2>Login</h2>
                <Login toggleAuth1={this.toggleAuth1} storeUser={this.props.storeUser} token={this.props.token} storeToken={this.props.storeToken} formFiller={this.onChange} username={this.state.username} password={this.state.password}/>
            </div>
        </div>
        )
    }
    renderAuth2(){
            return (
            <div className="outter-container">  
                <TwoFactorAuth />
            </div>
            )
    }

    render(){
        return(
            <div className="auth-land-zone">
                <div className="auth-container">
                    <div className="outter-container">  
                        {this.state.auth1 ? 
                            <TwoFactorAuth storeToken={this.props.storeToken} username={this.state.username} password={this.state.password} formFiller={this.onChange} />
                        :
                            <div>
                                <h2>Signup</h2>
                                <Signup formFiller={this.onChange} username={this.state.username} password={this.state.password}/>
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