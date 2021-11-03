import React,{Component} from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';

class CampaignMain extends Component {
    static async getInitialProps(props) {
        const address = props.query.address;
        const campaign = Campaign(address);
        const summary = await campaign.methods.getSummary().call();
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            address
        };
    }

    Cards(){
        const { 
            minimumContribution,
            balance,
            requestsCount,
            approversCount,
            manager
        } = this.props;

        const items = [{
            header: manager,
            meta: 'Address of the manager',
            description: 'The manager creates the campaign and can create spending requests',
            style: {overflowWrap: 'break-word'}
        },{
            header: minimumContribution,
            meta: 'Minimum Contribution (wei)',
            description: 'This is the minimum contribution to become as an approver',
            style: {overflowWrap: 'break-word'}
        },{
            header: web3.utils.fromWei(balance, 'ether'),
            meta: 'Balance of the campaign (ether)',
            description: 'The amount of ether in campaign',
            style: {overflowWrap: 'break-word'}
        },{
            header: requestsCount,
            meta: 'Number of Requests',
            description: 'This is the number of requests made by manager',
            style: {overflowWrap: 'break-word'}
        },{
            header: approversCount,
            meta: 'Number of Approvers',
            description: 'the number of people donated to this campaign',
            style: {overflowWrap: 'break-word'}
        }];

        return <Card.Group items={items}/>
    }
    render() {
        return(
            <Layout>
        <h1>Campaign Details</h1> 
        <h3>Address of the Campaign: {this.props.address}</h3>
        <br/>
        <br/>
        <Grid>
            <Grid.Row>
    <Grid.Column width={10}>
        {this.Cards()}
    </Grid.Column>
    <Grid.Column width={6}>
        <ContributeForm address={this.props.address}/>
    </Grid.Column>
    </Grid.Row>
    <Grid.Row>
        <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests/new`}><a><Button primary>Create Request</Button></a></Link>
  
    <Link route={`/campaigns/${this.props.address}/requests`}><a><Button disabled={this.props.requestsCount == 0} primary>View Requests</Button></a></Link>
    </Grid.Column>
    </Grid.Row>
    </Grid>
  
  
        </Layout>)
    }
}

export default CampaignMain;