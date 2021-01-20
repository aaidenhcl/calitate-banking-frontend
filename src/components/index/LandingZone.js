import React from 'react';
import { DB_URL } from '../../util/constants';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import moment from 'moment';
import { JSONToHTMLTable } from '@kevincobain2000/json-to-html-table'
var beautify = require("json-beautify");


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
            creditCardApprovalsRegion: undefined,
            creditCardApprovalsProfession: undefined,
            UserPaymentHistoryInput: undefined,
            loanRequestsApprovalsRegionInput: undefined,
            loanRequestsApprovalsProfessionInput: undefined
        }
        this.mockUsers = this.mockUsers.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this); 
        this.mockTotalCredit = this.mockTotalCredit.bind(this);
        this.renderData = this.renderData.bind(this);
        this.mockRegionSales = this.mockRegionSales.bind(this);
        this.mockClassification = this.mockClassification.bind(this);
        this.mockCreditCardSpends = this.mockCreditCardSpends.bind(this);
        this.mockCreditCardpatterns = this.mockCreditCardpatterns.bind(this);
        this.mockCreditCardpatternsStats = this.mockCreditCardpatternsStats.bind(this);
        this.mockCreditCardExpiration = this.mockCreditCardExpiration.bind(this);
        this.mockCreditCardRequestsDateRange = this.mockCreditCardRequestsDateRange.bind(this);
        this.handleDateChangeStart = this.handleDateChangeStart.bind(this);
        this.handleDateChangeEnd = this.handleDateChangeEnd.bind(this);
        this.mockCreditCardRequestsRejected = this.mockCreditCardRequestsRejected.bind(this);
        this.creditCardApprovalsRegionProfession = this.creditCardApprovalsRegionProfession.bind(this);
        this.mockCreditCardRequestsStatus = this.mockCreditCardRequestsStatus.bind(this);
        this.creditCardRequestsAverage = this.creditCardRequestsAverage.bind(this);
        this.mockRegionSpend = this.mockRegionSpend.bind(this); 
        this.mockUserPaymentHistory = this.mockUserPaymentHistory.bind(this);
        this.mockDemographicAge = this.mockDemographicAge.bind(this);
        this.mockDemographicRegion = this.mockDemographicRegion.bind(this);
        this.mockDemographicProfession = this.mockDemographicProfession.bind(this);
        this.mockCreditCardsDiscontinued = this.mockCreditCardsDiscontinued.bind(this);
        this.mockLoanRequestsStatus = this.mockLoanRequestsStatus.bind(this);
        this.mockLoanRequestsProfession = this.mockLoanRequestsProfession.bind(this);
        this.mockLoanRequestsRejected = this.mockLoanRequestsRejected.bind(this); 
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
        }).then(response =>{
            console.log(response.data)
            this.renderJsonParser(response.data)
        })
            
        .catch(error => this.handleCatch(error));
    }

    mockRegionSales() {
        axios.get(`${DB_URL}/creditCards/regionSale`,{
            headers:{
                Authorization: this.props.token
            }
        }).then(response =>{
            console.log(response.data)
            this.renderData(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    async mockClassification(){
        await axios.get(`${DB_URL}/users/${this.state.classificationInput}/classification`,{
            headers:{
                Authorization: this.props.token
            }
        }).then(response => {
            console.log(response.data)  
            this.renderJsonParser(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockCreditCardSpends(){
        axios.get(`${DB_URL}/creditCards/spends`,{
            headers:{
                Authorization: this.props.token,
                cardNo: this.state.creditCardSpendsInput
            }
        }).then(response => {
            console.log(response.data)
            this.renderData(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockCreditCardpatterns(){
        axios.get(`${DB_URL}/creditCards/patterns`,{
            headers:{
                Authorization: this.props.token,
                cardNo: this.state.creditCardPatternsInput
            }
        }).then(response => {
            console.log(response.data)  
            this.renderJsonParser(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockCreditCardpatternsStats(){
        axios.get(`${DB_URL}/creditCards/patterns/stats`,{
            headers:{
                Authorization: this.props.token,
                cardNo: this.state.creditCardPatternsStatsInput
            }
        }).then(response => {
            console.log(response.data)  
            this.renderJsonParser(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockCreditCardExpiration(){
        axios.get(`${DB_URL}/creditCards/expiration`,{
            headers:{
                Authorization: this.props.token,
            }
        }).then(response => {
            console.log(response.data)  
            this.renderJsonParser(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockCreditCardRequestsDateRange(){
        axios.get(`${DB_URL}/creditCardRequests/dateRange`,{
            headers:{
                Authorization: this.props.token,
            },
            params:{
                start: this.state.creditCardRequestsDateRangeStart,
                end: this.state.creditCardRequestsDateRangeEnd
            }
        }
        ).then(response => {
            console.log(response.data)  
            this.renderJsonParser(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockCreditCardRequestsRejected(){
        axios.get(`${DB_URL}/creditCardRequests/rejected`,{
            headers:{
                Authorization: this.props.token,
            }
        }).then(response => {
            console.log(response.data)  
            this.renderJsonParser(response.data)
        })
        .catch(error => this.handleCatch(error));
    }
    creditCardApprovalsRegionProfession(){
        axios.get(`${DB_URL}/creditCardRequests/approvals/regionProfession`,
        {
            headers:{
                Authorization: this.props.token,
            },
            params: {
                region: this.state.creditCardApprovalsRegion,
                profession: this.state.creditCardApprovalsProfession
            }
        }
        ).then(response => {
            console.log(response.data)  
            this.renderJsonParser(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockCreditCardRequestsStatus(){
        axios.get(`${DB_URL}/creditCardRequests/status`,
        {
            headers:{
                Authorization: this.props.token,
            }
        }
        ).then(response => {
            console.log(response.data)  
            this.renderData(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    creditCardRequestsAverage(){
        axios.get(`${DB_URL}/creditCardRequests/average`,
        {
            headers:{
                Authorization: this.props.token,
            }
        }
        ).then(response => {
            console.log(response.data)  
            this.renderJsonParser(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockRegionSpend(){
        axios.get(`${DB_URL}/spends/regionSpend`,
        {
            headers:{
                Authorization: this.props.token,
            }
        }
        ).then(response => {
            console.log(response.data)  
            this.renderData(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockUserPaymentHistory(){
        axios.get(`${DB_URL}/users/${this.state.UserPaymentHistoryInput}/paymentHistory`,
        {
            headers:{
                Authorization: this.props.token,
            }
        }
        ).then(response => {
            console.log(response.data)  
            this.renderJsonParser(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockDemographicAge(){
        axios.get(`${DB_URL}/users/demographics/age`,
        {
            headers:{
                Authorization: this.props.token,
            }
        }
        ).then(response => {
            console.log(response.data)  
            this.renderData(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockDemographicRegion(){
        axios.get(`${DB_URL}/users/demographics/region`,
        {
            headers:{
                Authorization: this.props.token,
            }
        }
        ).then(response => {
            console.log(response.data)  
            this.renderData(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockDemographicProfession(){
        axios.get(`${DB_URL}/users/demographics/profession`,
        {
            headers:{
                Authorization: this.props.token,
            }
        }
        ).then(response => {
            console.log(response.data)  
            this.renderData(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockCreditCardsDiscontinued(){
        axios.get(`${DB_URL}/creditCards/discontinued`,
        {
            headers:{
                Authorization: this.props.token,
            }
        }
        ).then(response => {
            console.log(response.data)  
            this.renderData(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockLoanRequestsStatus(){
        axios.get(`${DB_URL}/loanRequests/status`,
        {
            headers:{
                Authorization: this.props.token,
            }
        }
        ).then(response => {
            console.log(response.data)  
            this.renderData(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockLoanRequestsProfession(){
        axios.get(`${DB_URL}/loanRequests/approvals/regionProfession`,
        {
            headers:{
                Authorization: this.props.token,
            },
            params: {
                region: this.state.loanRequestsApprovalsRegionInput,
                profession: this.state.loanRequestsApprovalsProfessionInput
            }
        }
        ).then(response => {
            console.log(response.data)  
            this.renderJsonParser(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockLoanRequestsRejected(){
        axios.get(`${DB_URL}/loanRequests/rejected`,
        {
            headers:{
                Authorization: this.props.token,
            }
        }
        ).then(response => {
            console.log(response.data)  
            this.renderJsonParser(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    mockUsers(){
        axios.get(`${DB_URL}/users`,
        {
            headers:{
                Authorization: this.props.token,
            }
        }
        ).then(response => {
            console.log(response.data)  
            this.renderJsonParser(response.data)
        })
        .catch(error => this.handleCatch(error));
    }

    handleDateChangeStart(e){
        console.log(moment(e._d, "yyyyMMdd").format("yyyyMMDD"))
        this.setState({
            creditCardRequestsDateRangeStart: moment(e._d, "yyyyMMdd").format("yyyyMMDD")
        })
    }

    handleDateChangeEnd(e){
        console.log(moment(e._d, "yyyyMMdd").format("yyyyMMDD"))
        this.setState({
            creditCardRequestsDateRangeEnd: moment(e._d, "yyyyMMdd").format("yyyyMMDD")
        })
    }

    renderData(data){
        let respLoader = document.getElementById("response-loader");
        respLoader.innerHTML = "";
        data.forEach(cell => {
            this.renderJsonParser(cell, true)
            respLoader.innerHTML += "<br/>";
        })
        // respLoader.append(data);
    }

    renderJsonParser(data, iterated = false){
        let respLoader = document.getElementById("response-loader");
        const splitData = JSON.stringify(data).split(",");
        if(iterated != true){
            respLoader.innerHTML = "";
        }
        splitData.forEach(cell => {
            respLoader.innerHTML += cell+'<br/>'
        })
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
                    <Form.Control onChange={this.handleOnChange} name="creditCardSpendsInput" type="text" placeholder={"Enter a credit card number"} />
                    <Button onClick={this.mockCreditCardSpends} variant="primary" >creditCard/spends</Button>
                </Form>
                
                <Button onClick={this.mockCreditCardExpiration} variant="primary" >/creditCards/expiration</Button>

                <Button onClick={this.mockCreditCardRequestsStatus} variant="primary" >/creditCardRequests/status</Button>

                <Button onClick={this.creditCardRequestsAverage} variant="primary" >/creditCardRequests/average</Button>
                <Button onClick={this.mockLoanRequestsStatus} variant="primary" >loanRequests/status</Button>

                <br/>
                <br/>

                <Form>
                    <Button onClick={this.mockRegionSales} variant="primary" >users/regionSale</Button>
                </Form>
                <Button onClick={this.mockDemographicAge} variant="primary" >users/demographics/age</Button>
                <Button onClick={this.mockDemographicRegion} variant="primary" >users/demographics/region</Button>
                <Button onClick={this.mockDemographicProfession} variant="primary" >users/demographics/profession</Button>
                <Button onClick={this.mockCreditCardsDiscontinued} variant="primary" >creditCards/discontinued</Button>
                <Button onClick={this.mockRegionSpend} variant="primary" >/spends/regionSpend</Button>
                <br/><br/>

                <Form>
                    <Form.Control onChange={this.handleOnChange} name="totalCreditInput" type="text" placeholder={"Enter a username"} />
                    <Button onClick={this.mockTotalCredit} variant="primary" >users/totalCredit</Button>
                </Form>
 
                <Form>
                    <Form.Control onChange={this.handleOnChange} name="creditCardApprovalsRegion" type="text" placeholder={"Enter a region"} />
                    <Form.Control onChange={this.handleOnChange} name="creditCardApprovalsProfession" type="text" placeholder={"Enter a profession"} />
                    <Button onClick={this.creditCardApprovalsRegionProfession} variant="primary" >/creditCardRequests/approvals/regionProfession</Button>
                </Form>   

                <Form>
                    <Form.Control onChange={this.handleOnChange} name="UserPaymentHistoryInput" type="text" placeholder={"Enter a username"} />
                    <Button onClick={this.mockUserPaymentHistory} variant="primary" >/users/username/paymentHistory</Button>
                </Form>
           
                <Form>
                    <Form.Control onChange={this.handleOnChange} name="loanRequestsApprovalsRegionInput" type="text" placeholder={"Enter a region"} />
                    <Form.Control onChange={this.handleOnChange} name="loanRequestsApprovalsProfessionInput" type="text" placeholder={"Enter a profession"} />
                    <Button onClick={this.mockLoanRequestsProfession} variant="primary" >/loanRequests/approvals/regionProfession</Button>
                </Form>
                
                <br/>

                <Button onClick={this.mockLoanRequestsRejected} variant="primary" >/loanRequests/rejected</Button>
                <Button onClick={this.mockUsers} variant="primary" >/users</Button>
                <Button onClick={this.mockCreditCardRequestsRejected} variant="primary" >/creditCardRequests/rejected</Button>

                <Form>
                    <Form.Control onChange={this.handleOnChange} name="creditCardPatternsInput" type="text" placeholder={"Enter a credit card number"} />
                    <Button onClick={this.mockCreditCardpatterns} variant="primary" >creditCard/patterns</Button>
                </Form>

                <Form>
                    <Form.Control onChange={this.handleOnChange} name="creditCardPatternsStatsInput" type="text" placeholder={"Enter a credit card number"} />
                    <Button onClick={this.mockCreditCardpatternsStats} variant="primary" >creditCard/patterns/stats</Button>
                </Form>


                
                <Form>
                    <Form.Control onChange={this.handleOnChange} name="classificationInput" type="text" placeholder={"Enter a username"} />
                    <Button onClick={this.mockClassification} variant="primary" >users/username/classification</Button>
                </Form>


                <div class="container">
                    <Datetime onChange={this.handleDateChangeStart} open={true}/>
                    <Button className={"date-button"} onClick={this.mockCreditCardRequestsDateRange} variant="primary" >/creditCardRequests/dateRange</Button>
                    <Datetime onChange={this.handleDateChangeEnd} open={true}/>
                    <div></div>
                </div>

            </div>
        )
    }

}

export default LandingZone;