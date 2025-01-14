# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

## UML Diagrams
### Activity
![](images/Activity.png)
### Sequence
![](images/Sequence.png)
### State
![](images/State.png)
### Classes (Data Model)
![](images/Classes%20(Data%20Model).png)

### UI Transaction History
![](images/UI.png)

## Libraries
 - Truffle `v5.1.65` 
 - Solidity `^0.4.24`
 - Node `v14.17.1`
 - Web3.js `v1.2.9`
 - ganache `v7.7.4`
 - @truffle/hdwallet-provider `^2.1.7` 
   - Used to securely connect to Metamask
 - dotenv `^16.0.3`  
   - Used to securely read environment variables form `.env` file

## IPFS

> Not Used
>
## Contract
 - Address - `0x73ddF36504F076C260E4b4A16afC5D052D84B9b5`
 - Transaction ID - `0x51c28975bc61d7022eb3f08675beef569257df136e26c5f6e34ce8c6e55ce300`
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.

```
npm i -g ganache
npm i -g truffle@5.1.65
```

### Installing


A step by step series of examples that tell you have to get a development env running

Clone this repository:

```
git clone https://github.com/udacity/nd1309/tree/master/course-5/project-6
```

Change directory to ```project-6``` folder and install all requisite npm packages (as listed in ```package.json```):

```
cd project-6
npm install
```

Launch Ganache:

```
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

Your terminal should look something like this:

![truffle test](images/ganache-cli.png)

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

Your terminal should look something like this:

![truffle test](images/truffle_compile.png)

This will create the smart contract artifacts in folder ```build\contracts```.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Your terminal should look something like this:

![truffle test](images/truffle_migrate.png)

Test smart contracts:

```
truffle test
```

All 10 tests should pass.

![truffle test](images/truffle_test.png)

In a separate terminal window, launch the DApp:

```
npm run dev
```

## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
to make the web faster, safer, and more open.
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.


## Authors

See also the list of [contributors](https://github.com/your/project/contributors.md) who participated in this project.

## Acknowledgments

* Solidity
* Ganache-cli
* Truffle
* IPFS
