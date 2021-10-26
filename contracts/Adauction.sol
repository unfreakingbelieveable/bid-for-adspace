// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.6;

contract Adauction {
    event NewAd(address indexed _from, uint256 _amount, string _link);

    uint256 public currBid;

    function bid(string memory _link) external payable {
        require(msg.value > currBid, "Bid is not higher than old bid");
        currBid = msg.value;
        emit NewAd(msg.sender, msg.value, _link);
    }
}
