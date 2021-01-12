import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';
import { DB_URL } from '../../util/constants';

export default function Login(props){

    //logs in the user through first layer of authentication
    //if success triggers level two auth
    //invokes toggle auth function to reRender auth page to TwoFactorAuth Component
     function authenticateUser(){
        console.log("AUTH HIT");
         axios.get(`${DB_URL}/users/login/${props.username}`,{
            headers:{
                password: props.password
            } 
        })
        .then(response => {
            if(response.data){
                props.toggleAuth1();
            } else{
                console.log("Incorrect Username or Password")
            }
        })
        .catch(error => console.log("not reaching then::: " + error));
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