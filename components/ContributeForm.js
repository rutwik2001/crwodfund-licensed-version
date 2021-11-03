import React, {Component} from 'react';
import { Button, Form, Input, Message} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class ContributeForm extends Component  {
    state= {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    }
    onSubmit = async (event) => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);

        this.setState({loading: true, errorMessage: ''});

        try{
            const accounts = await web3.eth.getAccounts();
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.minimumContribution, 'ether')
        });
        Router.replaceRoute(`/campaigns/${this.props.address}`)
        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});

        
    }
    render(){
    return (
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
    <Form.Field>
      <h5>Amount to Contribute</h5>
      <Input label='ether' labelPosition='right'
        value={this.state.minimumContribution}
       onChange={event=>{this.setState({minimumContribution: event.target.value})}}/>
    </Form.Field>

    <Message
    error
    header='There was some error with your submission'
    content = {this.state.errorMessage}
  />

    
    <Button loading={this.state.loading} primary type='submit'>Contribute</Button>
  </Form>
    )
    }
}

export default ContributeForm;