import axios from 'axios';
import React from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import { DB_URL } from '../../util/constants';

//will be the home page
export class Index extends React.Component{
    _isMounted = false;

    constructor(){
        super();

        this.state = {
            user: undefined,
            username: localStorage.getItem("username"),
            loggedIn: false,
            isMounted:false
        }
        //bind functions here

    }

    async componentDidMount(){
        this._isMounted = true;
        this.setState({
            isMounted: true
        })
        //get user data and store to state
        console.log(this.state.username)
        console.log(this.props.token);
        if(this._isMounted && this.state.username){
            await axios.post(`${DB_URL}/users/${this.state.username}`,{
                headers: {
                    Authorization: this.props.token
                }
            }).then(response => {
                console.log("RESP DATA::: " + response.data)
                this.setState({
                    user: response.data,
                    isMounted: true
                })
                if(!response){
                    //redirect to login
                    console.log("Should redirect here...");
                    return <Redirect to="/auth"/>
                } else{
                    this.setState({
                        loggedIn: true
                    })
                }  
            })
        }
    }



    render(){
        return(
            <div>
                {this.state.user ? null: this._isMounted ? <Redirect to="/auth"/>:null }
                {/* {this.state.loggedIn ? null: this.state.isMounted ?  <Redirect to="/auth"/>:this.isLoggedIn()} */}
                <h1>WELCOME TO THE INDEX LANDING PAGE</h1>
            </div>
        )
    }

}

export default Index;