import React, { Component } from 'react';
import { Button, Form, Input, Message} from 'semantic-ui-react'
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import {Router} from '../../routes';

class New extends Component {
    state = {
            minimumContribution: '',
            errorMessage: '',
            loading: false
        }
    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});

        try{
            const accounts = await web3.eth.getAccounts();
        await factory.methods.createCampaign(this.state.minimumContribution).send({
            from: accounts[0]
        });

        Router.pushRoute('/')
        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});

        
    }
    render(){
        
    return (<Layout>
        <h1>Create a Campaign</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
    <Form.Field>
      <h5>Minimum Contribution</h5>
      <Input label='wei' labelPosition='right'
       value={this.state.minimumContribution}
       onChange={event=>{this.setState({minimumContribution: event.target.value})}}/>
    </Form.Field>

    <Message
    error
    header='There was some error with your submission'
    content = {this.state.errorMessage}
  />
    
    <Button loading={this.state.loading} primary type='submit'>Create</Button>
  </Form>

        </Layout>
        )}
}

export default New;