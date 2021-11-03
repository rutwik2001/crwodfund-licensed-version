import React, { Component} from 'react';
import Layout from '../../../components/Layout';
import {Link} from '../../../routes';
import {Button, Table} from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow'

class Requests extends Component {
    static async getInitialProps(props) {
        const {address} = props.query;
        const campaign = Campaign(address);
        const requestsCount = await campaign.methods.getRequestCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(requestsCount).fill().map((element, index) => {
            return campaign.methods.requests(index).call()
        })
        );
        
        console.log()
        return {address, requests, requestsCount, approversCount};
    }

    renderRows(){
        return this.props.requests.map((request, index) =>{
            return (
                <RequestRow key={index} id={index} request={request} address={this.props.address} approversCount={this.props.approversCount}/>
            )
        })
    }

    render() {
        const {Header, Row, HeaderCell, Body} = Table;
        return(
        <Layout>
        <h1>Requests List</h1>
        <Link route={`/campaigns/${this.props.address}/requests/new`}><a><Button floated='right' style = {{marginBottom:'15px'}} primary>Create Request</Button></a></Link>
        <Table>
            <Header>
                <HeaderCell>Id</HeaderCell>
                <HeaderCell>Description</HeaderCell>
                <HeaderCell>Amount</HeaderCell>
                <HeaderCell>Recipient</HeaderCell>
                <HeaderCell>Approval Count</HeaderCell>
                <HeaderCell>Approve</HeaderCell>
                <HeaderCell>Finalize</HeaderCell>    
            </Header>
            <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestsCount} request/s</div>
        </Layout>)
    }
}

export default Requests;