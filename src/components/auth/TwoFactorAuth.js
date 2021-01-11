import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { DB_URL } from '../../util/constants';

export default function TwoFactorAuth(props){

    function twoFactAuth() {
        axios.get(`${DB_URL}/login/2fa/${props.username}`,{
            headers:{
                twoFactorAuth: props.password
            }
        })
        .then(response => {
            console.log(response.data);
            // uncomment logic below to store token in local storage
            // this.props.storeToken(response.data)
        })
    }

    // await axios.get(`${DB_URL}/users/${props.username}`,{
        //         headers: {
        //             Authorization: props.token
        //         }
        //     })

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

