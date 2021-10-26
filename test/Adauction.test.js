const Adauction = artifacts.require('Adauction');

const chai = require('chai');
const assert = chai.assert;
const truffleAssert = require('truffle-assertions');
const timeMachine = require('ganache-time-traveler');

const url = 'https://www.google.com';

contract('Adauction', () => {
    let adAuction;
    let accounts;
    
    before( async () => {
        adAuction = await Adauction.new();
        accounts = await web3.eth.getAccounts();
    })

    it('checks for proper init', async () => {
        let result;
        result = await adAuction.currBid();
        assert.equal(result, 0);
    })

    it('bids for new image', async () => {
        let result;
        let bidAmount = 2
        await adAuction.bid(url, { sender: accounts[0], value: bidAmount });
        result = await adAuction.currBid();
        assert.equal(result, bidAmount);

        // check for event
        result = await adAuction.getPastEvents('NewAd');
        assert.equal(result[0]['returnValues']['_amount'], bidAmount);
        assert.equal(result[0]['returnValues']['_link'], url);
    })

    it('fails to bid under', async () => {
        await truffleAssert.reverts(adAuction.bid(url, { sender: accounts[0], value: 1 }), 'Bid is not higher than old bid');
    })
})