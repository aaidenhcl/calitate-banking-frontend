import React, {Component} from 'react';
import Login from './Login'; 
import Signup from './Signup';

export class Auth extends Component{
    constructor(){
        super()

        this.state = {
            username: undefined,
            password:undefined
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
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
                        <Login storeUser={this.props.storeUser} token={this.props.token} storeToken={this.props.storeToken} formFiller={this.onChange} username={this.state.username} password={this.state.password}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth;