import web3 from './web3';
import Campaign from './build/Campaign';

const abi = Campaign.abi;


export default (address) => {
    return new web3.eth.Contract(abi, address);
    
}