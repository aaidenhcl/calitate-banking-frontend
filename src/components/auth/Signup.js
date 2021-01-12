import { render } from '@testing-library/react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {DB_URL} from '../../util/constants';

export default function Signup(props){

    function createUser(e){
        console.log("EMAIL::: " + props.email);
        console.log(e.target.parentNode.children[0]);
        axios.post(`${DB_URL}/users`, {
            username: props.username,
            password: props.password,
            email: props.email
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }

    return(
        <div>
            {console.log(props)}
            <Form>
                <Form.Group >
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={props.formFiller} name="username" plaintext placeholder="Enter Username"/>
                </Form.Group>

                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={props.formFiller} name="password" type="password" placeholder="Enter Password"/>
                </Form.Group>

                <Form.Group >
                    <Form.Label>email</Form.Label>
                    <Form.Control onChange={props.formFiller} name="email" type="email" placeholder="Enter Email"/>
                </Form.Group>


                <Button onClick={createUser}>Create User</Button>
            </Form>
        </div>
    )
}