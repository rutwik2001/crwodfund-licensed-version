const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const CampaignFactory = require('../ethereum/build/CampaignFactory.json');
const Campaign = require('../ethereum/build/Campaign.json');


const CampaignFactory_bytecode = CampaignFactory.evm.bytecode.object;
const CampaignFactory_abi = CampaignFactory.abi;
const Campaign_bytecode = Campaign.evm.bytecode.object;
const Campaign_abi = Campaign.abi;

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(CampaignFactory_abi)
        .deploy({data: '0x' + CampaignFactory_bytecode})
        .send({from: accounts[0], gas: '3000000'});

    await factory.methods.createCampaign('100').send({from: accounts[0], gas: '6000000'});

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    campaign = await new web3.eth.Contract(Campaign_abi, campaignAddress);
});

describe('Campaigns', () => {

    it('deploys a factory and campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });
})

