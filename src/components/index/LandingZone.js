import React from 'react';
import { DB_URL } from '../../util/constants';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';


export class LandingZone extends React.Component{

    constructor(){
        super()

        this.state = {
            totalCreditInput: undefined,
            classificationInput: undefined,
            creditCardSpendsInput: undefined,
            creditCardPatternsInput: undefined,
            creditCardPatternsStatsInput: undefined,
            creditCardRequestsDateRangeStart: undefined,
            creditCardRequestsDateRangeEnd: undefined,
        }
        this.handleOnChange = this.handleOnChange.bind(this); 
        this.mockTotalCredit = this.mockTotalCredit.bind(this);
        this.renderData = this.renderData.bind(this);
        this.mockRegionSales = this.mockRegionSales.bind(this);
        this.mockClassification = this.mockClassification.bind(this);
        this.mockCreditCardSpends = this.mockCreditCardSpends.bind(this);
        this.mockCreditCardpatterns = this.mockCreditCardpatterns.bind(this);
        this.mockCreditCardpatternsStats = this.mockCreditCardpatternsStats.bind(this);
        this.mockCreditCardExpiration = this.mockCreditCardExpiration.bind(this);
        this.mockCreditCardRequestsDateRange = this.mockcreditCardRequestsDateRange.bind(this);
    }

    handleOnChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    mockTotalCredit(){
        axios.get(`${DB_URL}/users/${this.state.totalCreditInput}/totalCredit`,{
            headers:{
                Authorization: this.props.token
            }
        }).then(response => this.renderData(response.data))
        .catch(error => this.handleCatch(error));
    }

    mockRegionSales() {
        axios.get(`${DB_URL}/creditCards/regionSale`,{
            headers:{
                Authorization: this.props.token
            }
        }).then(response => this.renderData(JSON.stringify(response.data)))
        .catch(error => this.handleCatch(error));
    }

    mockClassification(){
        axios.get(`${DB_URL}/users/${this.state.classificationInput}/classification`,{
            headers:{
                Authorization: this.props.token
            }
        }).then(response => this.renderData(JSON.stringify(response.data)))
        .catch(error => this.handleCatch(error));
    }

    mockCreditCardSpends(){
        axios.get(`${DB_URL}/creditCards/spends`,{
            headers:{
                Authorization: this.props.token,
                cardNo: this.state.creditCardSpendsInput
            }
        }).then(response => this.renderData(JSON.stringify(response.data)))
        .catch(error => this.handleCatch(error));
    }

    mockCreditCardpatterns(){
        axios.get(`${DB_URL}/creditCards/patterns`,{
            headers:{
                Authorization: this.props.token,
                cardNo: this.state.creditCardPatternsInput
            }
        }).then(response => this.renderData(JSON.stringify(response.data)))
        .catch(error => this.handleCatch(error));
    }

    mockCreditCardpatternsStats(){
        axios.get(`${DB_URL}/creditCards/patterns/stats`,{
            headers:{
                Authorization: this.props.token,
                cardNo: this.state.creditCardPatternsStatsInput
            }
        }).then(response => this.renderData(JSON.stringify(response.data)))
        .catch(error => this.handleCatch(error));
    }

    mockCreditCardExpiration(){
        axios.get(`${DB_URL}/creditCards/expiration`,{
            headers:{
                Authorization: this.props.token,
            }
        }).then(response => this.renderData(JSON.stringify(response.data)))
        .catch(error => this.handleCatch(error));
    }

    mockcreditCardRequestsDateRange(){

    }

    renderData(data){
        let respLoader = document.getElementById("response-loader");
        respLoader.innerHTML = "";
        respLoader.append(data);
    }

    handleCatch(error){
        let respLoader = document.getElementById("response-loader");
        respLoader.innerHTML = "";
        respLoader.append("Request did not go through for the following reason: " + error);
    }

    render(){
        return(
            <div className="landing-zone">
                <h2>response loader</h2>
                <div id="response-loader" className='response-loader'>
                
                </div>
                <Form>
                    <Button onClick={this.mockRegionSales} variant="primary" >users/regionSale</Button>
                </Form>

                <Form>
                    <Form.Control onChange={this.handleOnChange} name="totalCreditInput" type="text" placeholder={"Enter a username"} />
                    <Button onClick={this.mockTotalCredit} variant="primary" >users/totalCredit</Button>
                </Form>

                <Form>
                    <Form.Control onChange={this.handleOnChange} name="classificationInput" type="text" placeholder={"Enter a username"} />
                    <Button onClick={this.mockClassification} variant="primary" >users/username/classification</Button>
                </Form>

                <Form>
                    <Form.Control onChange={this.handleOnChange} name="creditCardSpendsInput" type="text" placeholder={"Enter a credit card number"} />
                    <Button onClick={this.mockCreditCardSpends} variant="primary" >creditCard/spends</Button>
                </Form>

                <Form>
                    <Form.Control onChange={this.handleOnChange} name="creditCardPatternsInput" type="text" placeholder={"Enter a credit card number"} />
                    <Button onClick={this.mockCreditCardpatterns} variant="primary" >creditCard/patterns</Button>
                </Form>

                <Form>
                    <Form.Control onChange={this.handleOnChange} name="creditCardPatternsStatsInput" type="text" placeholder={"Enter a credit card number"} />
                    <Button onClick={this.mockCreditCardpatternsStats} variant="primary" >creditCard/patterns/stats</Button>
                </Form>

                <Form>
                    <Button onClick={this.mockCreditCardExpiration} variant="primary" >/creditCards/expiration</Button>
                </Form>

                <Form>
                    <Datetime className="date-time" open={true}/>
                    <Datetime className="date-time" open={true}/>
                    <Button onClick={this.mockCreditCardExpiration} variant="primary" >/creditCards/expiration</Button>
                </Form>

            </div>
        )
    }

}

export default LandingZone;