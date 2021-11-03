const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);


const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol')
const source = fs.readFileSync(campaignPath, 'utf8');
var input = {
  language: 'Solidity',
  sources: {
    'Campaign.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};



const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));


const contractFile = tempFile.contracts['Campaign.sol'];

fs.ensureDirSync(buildPath)

for (let contract in contractFile) {
  fs.outputJsonSync(path.resolve(buildPath, contract + '.json'), contractFile[contract]);
}


