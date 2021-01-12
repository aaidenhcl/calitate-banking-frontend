import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { DB_URL } from '../../util/constants';
import { useHistory } from "react-router-dom";

export default function TwoFactorAuth(props){
    const history = useHistory();

    /*
     * pings two factor auth with updated code from email
     * if success, then generates and stores token  
     * invokes the getUserData function
     */
    function twoFactAuth() {
        axios.get(`${DB_URL}/users/login/2fa/${props.username}`,{
            headers:{
                twoFactorAuth: props.password
            }
        })
        .then(response => {
            console.log(response.data);
            // uncomment logic below to store token in local storage
            props.storeToken(response.data);
            getUserData(response.data);
        })
    }

    /**
     * uses token and username to fetch user data
     * redirects to index landing page 
     */
    async function getUserData(token){
        console.log("PROPS::: " + props.username);
        console.log("THE TOKEN::: " + token);
        await axios.get(`${DB_URL}/users/${props.username}`,{
            headers: {
                Authorization: token
            }
        })
        .then(response => {
            console.log("RESP DATA::" + response.data)
            props.storeUser(response.data)
        })
        .catch(error => console.log(error));
        history.push("/");
    }


    return(
        <div className="login-container">
        <Form>
            <Form.Group >
                <Form.Label>Secret Code</Form.Label>
                <Form.Control onChange={props.formFiller} type="password" name="password" plaintext placeholder="Enter Secret Code"/>
            </Form.Group>
            <Button onClick={twoFactAuth}>Login</Button>
        </Form>
        </div>
    )
}

