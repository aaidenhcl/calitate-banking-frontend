import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';
import { DB_URL } from '../../util/constants';
import { useHistory } from "react-router-dom";

export default function Login(props){

    const history = useHistory();

    async function authenticateUser(){
        await axios.get(`${DB_URL}/login/${props.username}`,{
            headers:{
                password: props.password
            } 
        })
        .then(async response => props.storeToken(response.data))
        .then(await getUserData(props.token))
        .catch(error => console.log(error));

    }

    async function getUserData(token){
        await axios.get(`${DB_URL}/obtainUserData/${props.username}`,{
            headers: {
                Authorization: props.token
            }
        })
        .then(response => {
            console.log("RESP DATA::" + response.data)
            props.storeUser(response.data)
        })
        // .then(() => {
        // })
        .catch(error => console.log(error));
        // return <Redirect to="/index"/>
        history.push("/");
    }

    return(
        <div className="login-container">
            <Form>
                <Form.Group >
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={props.formFiller} name="username" plaintext placeholder="Enter Username"/>
                </Form.Group>

                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={props.formFiller} name="password" type="password" placeholder="Enter Password"/>
                </Form.Group>


                <Button onClick={authenticateUser}>Login</Button>
            </Form>
        </div>
    )

}