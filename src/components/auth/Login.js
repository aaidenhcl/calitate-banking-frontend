import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { DB_URL } from '../../util/constants';

export default function Login(props){


    async function authenticateUser(){
        await axios.get(`${DB_URL}/login/${props.username}`,{
            headers:{
                password: props.password
            } 
        })
        .then(response => props.storeToken(response.data))
        .catch(error => console.log(error));
        getUserData(props.token)
    }

    async function getUserData(token){
        await axios.get(`${DB_URL}/obtainUserData/${props.username}`,{
            headers: {
                Authorization: props.token
            }
        })
        .then(response => props.storeUser(response.data))
        .catch(error => console.log(error));
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