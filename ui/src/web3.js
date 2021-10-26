import Web3 from 'web3';

let accounts;
let web3;

const getAccounts = async () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        accounts = await web3.eth.getAccounts();
        return true
      } catch(e) {
        console.log(e);
        return false
      }
    }
}

getAccounts();

export { web3, accounts };