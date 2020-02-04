import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import Authorized from './Authorized'
import Unauthorized from './Unauthorized'

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.fetchAccount()
    await this.checkAuthorization()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async fetchAccount() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }

  async checkAuthorization() {
    const authorizedAccounts = [
      '0x33a75943Ca7Ed31C66199FE851AeaF0A758837E3',
      '0xAE2f34aEead72Bfd46138A4E662FE284F9a4DB43',
      '0x1E2418fe04D20cD7eE6A91A3AD1d299fa8c9e20c',
      '0x8A97d72B4c823d96f18d76bA668e2a5CDcAC95Af',
      '0x719C632328eB541183F34C5c616ac359E828ec21'
    ]
    const authorized = authorizedAccounts.includes(this.state.account)
    this.setState({ authorized })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      authorized: false
    }
  }

  render() {
    let body

    if (this.state.authorized) {
      body = <Authorized account={this.state.account} />
    } else {
      body = <Unauthorized account={this.state.account} />
    }

    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                {body}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
