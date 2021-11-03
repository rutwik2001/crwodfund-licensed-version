import React, { Component} from "react";
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign';
import {Router} from '../routes';

class RequestRow extends Component {
    state = {
        loading: false,
        loading2: false
    }
    onApprove = async () => {
        const campaign = Campaign(this.props.address)
        const accounts = await web3.eth.getAccounts();
        this.setState({loading: true});
        try{
            await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });
        Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
        } catch(err) {
            
        }
        
        this.setState({loading: false});
    };
    onFinalize = async () => {
        const campaign = Campaign(this.props.address)
        const accounts = await web3.eth.getAccounts();
        this.setState({loading2: true});
        try{
            await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });
        Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
        } catch(err) {
            
        }
        
        this.setState({loading2: false});
    };
    render() {
        const {Row, Cell} = Table;
        const {id, request, approversCount} = this.props;
        const readyToFinalize = request.approvalCount > (approversCount/2);
        return(
            <Row disabled={request.complete} positive = {readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value,'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell>{request.complete? null:(
                    <Button color="green" loading = {this.state.loading}  onClick={this.onApprove}>Approve</Button>)}</Cell>
                <Cell>{request.complete? null:(<Button color="red" loading = {this.state.loading2}  onClick={this.onFinalize}>Finalize</Button>)}</Cell>
            </Row>
        )
    }
}

export default RequestRow;