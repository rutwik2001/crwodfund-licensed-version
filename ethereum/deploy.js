if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const CampaignFactory = require('./build/CampaignFactory.json')

const bytecode = CampaignFactory.evm.bytecode.object;
const abi = CampaignFactory.abi;

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    process.env.URL
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    const result = await new web3.eth.Contract(abi)
        .deploy({data: '0x' +bytecode})
        .send({ gas: '6000000', gasPrice: '5000000000', from: accounts[0] });
    console.log(abi);
    console.log('Contract deployed to ', result.options.address);
}
deploy();