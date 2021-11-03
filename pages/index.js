import React,{Component} from 'react';
import { Card, Button, Icon, Container } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout'
import {Link} from '../routes'

class CampaignIndex extends Component{
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call()

        return {campaigns}
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address =>{
            return{
                header: address,
                description: (<Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>),
                fluid: true,
            style: {overflowWrap: 'break-word'}
                
            }
        })

        return <Card.Group items = {items}/>
    }

    render() {
        return(
                <Layout>
                    <h1>Open Campaigns</h1>
                    <Link route='/campaigns/new'><a><Button floated='right' icon labelPosition='left' primary> Create Campaign <Icon name='add circle' /> </Button></a></Link>
            
            {this.renderCampaigns()}
            
            </Layout>)
    }
}

export default CampaignIndex;