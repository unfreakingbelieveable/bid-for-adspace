import { web3 } from './web3';
const abi = require('./abi.json');

const address = '0xa48296620E0F09D712736b95d6F09Ad9A116E272';

export default new web3.eth.Contract(abi.abi, address);