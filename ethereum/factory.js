import web3 from './web3';
import CampaignFactory from './build/CampaignFactory';

const abi = CampaignFactory.abi;

const instance = new web3.eth.Contract(abi, '0x73bB7A241D27467CaE2201f1c446636eb1D9d866')

export default instance;