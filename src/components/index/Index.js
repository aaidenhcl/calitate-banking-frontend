import axios from 'axios';
import React from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import { DB_URL } from '../../util/constants';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LandingZone from './LandingZone';

//will be the home page
export class Index extends React.Component{
    _isMounted = false;

    constructor(){
        super();

        this.state = {
            user: undefined,
            username: localStorage.getItem("username"),
            loggedIn: true,
            // isMounted:false
        }
        //bind functions here
        this.mountComponent = this.mountComponent.bind(this);
        this.fetchRejectedCcrs = this.fetchRejectedCcrs.bind(this);
   }

    /**
     * I had a lot of trouble with this function
     * I was using componentDidMount() but was getting a lot of memory leaks and errors
     * This probably isnt the best implementation
     * is sort of a bandaid...
     * hopefully it holds.
     */
    async mountComponent(){
        console.log("HITTING COMP DID MOUNT")
        //get user data and store to state
        console.log(this.state.username)
        console.log(this.props.token);
            if(!this._isMounted){
            this._isMounted = true;
            this.setState({
                isMounted: true
            })
            await axios.get(`${DB_URL}/users/${this.state.username}`,{
                headers: {
                    Authorization: this.props.token
                }
            }).then(response => {
                console.log("RESP DATA::: " + JSON.stringify(response.data))
                console.log(response.data);
                if(!response || response.data == ""){
                    //redirect to login
                    console.log("Should redirect here...");
                    this.setState({
                        loggedIn: false
                    })
                    return <Redirect to="/auth"/>
                } else{
                    this.setState({
                        user: response.data,
                        isMounted: true,
                        loggedIn: true
                    })
                }  
            }).catch(error => {
                console.log("ERROR::: " + error);
                console.log("Should redirect here...");
                    this.setState({
                        loggedIn: false
                    })
            })
        }
    }

    /**
     * this resolved a memory leak warning
     */
    componentWillUnmount(){
        this._isMounted = false;
    }

    fetchRejectedCcrs(){
        axios.get(`${DB_URL}/creditCardRequests/rejected`)
        .then(response => console.log(response.data));
    }



    render(){
        //needed to validate authenticated user
        this.mountComponent()
        this.fetchRejectedCcrs()
        return(
            <div className="index">
                {this.state.user ? null: this.state.loggedIn ? null:<Redirect to="/auth"/> }
                {console.log("loggedIn? ::: "+this.state.loggedIn)}
                {/* {this.state.loggedIn ? null: this.state.isMounted ?  <Redirect to="/auth"/>:this.isLoggedIn()} */}
                <h1>WELCOME TO THE INDEX LANDING PAGE</h1>
                <LandingZone token={this.props.token}/>
            </div>
        )
    }

}

export default Index;