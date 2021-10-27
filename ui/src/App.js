import './App.css';
import React from 'react';
import { accounts } from './web3';
import contract from './contract';

class App extends React.Component {
  
  refreshData;

  state = {
    lastBid: 0,
    highestBidder: '',
    currLink: '',
  }

  constructor() {
    super();
    this.submitBid = this.submitBid.bind(this);
  }

  async submitBid(event) {
    event.preventDefault();
    let link = event.target[0].value;
    let bid = event.target[1].value
    await contract.methods.bid(link).send({ from: accounts[0], value: bid });
    await this.getCurrentData();
  }

  async getCurrentData() {
    let data = await contract.getPastEvents('NewAd');
    
    if (data.length > 0) {
      this.setState({ lastBid: data[0]['returnValues']['_amount'] });
      this.setState({ currLink: data[0]['returnValues']['_link'] });
      this.setState({ highestBidder: data[0]['returnValues']['_from'] })
    }
  }

  async componentDidMount() {
    await this.getCurrentData();

    this.refreshData = setInterval(this.getCurrentData, 3000)
  }

  async componentWillUnmount() {
    clearInterval(this.refreshData);
  }

  render () {
    let img;
    let info;
    let form;
    if(this.state.lastBid === 0) {
      img = 'Nothing to see yet!'
    } else {
      img = <img src={this.state.currLink}></img>
      info = <p>Current bid is {this.state.lastBid} wei by {this.state.highestBidder}</p>
    }

    form = <form onSubmit={this.submitBid}>
            <input placeholder='Paste a Link' required/>
            <input type='number' placeholder={this.state.lastBid + 1} required />
            <input type='submit' value='Bid'/>
          </form>

    return (
      <div className="App">
        <header className="App-header">
          <p>Beat the bid below to show your image!</p>
          {img}
          {info}
          {form}
        </header>
      </div>
    );
  }
}

export default App;
