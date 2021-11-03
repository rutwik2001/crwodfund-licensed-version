import React, { Component} from 'react';
import { Button, Form, Input, Message} from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';
import {Link, Router} from '../../../routes';

class NewRequest extends Component {
    static async getInitialProps(props){
        const {address} = props.query;

        
        return {address}
    }
    state = {
        description: '',
        value: '',
        recipient: '',
        loading: false,
        errorMessage: ''
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const campaign =  Campaign(this.props.address);
        const {description, value, recipient} = this.state

        this.setState({loading: true, errorMessage: ''});

        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({
                from: accounts[0]
            })

        Router.pushRoute(`/campaigns/${this.props.address}/requests`)
        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});

    }
    render() {
        return (<Layout>
            <h1>Create Request</h1>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
    <Form.Field>
      <h5>Description</h5>
      <Input
       value={this.state.description}
       onChange={event=>{this.setState({description: event.target.value})}}/>
    </Form.Field>
    <Form.Field>
      <h5>Amount in ether</h5>
      <Input label='ether' labelPosition='right'
       value={this.state.value}
       onChange={event=>{this.setState({value: event.target.value})}}/>
    </Form.Field>
    <Form.Field>
      <h5>Recipient</h5>
      <Input 
       value={this.state.recipient}
       onChange={event=>{this.setState({recipient: event.target.value})}}/>
    </Form.Field>

    <Message
    error
    header='There was some error with your submission'
    content = {this.state.errorMessage}
  />
    
    <Button loading={this.state.loading} primary type='submit'>Create</Button>
  </Form>
            </Layout>
        )
    }
}

export default NewRequest;