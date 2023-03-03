const HDWallet = require("@truffle/hdwallet-provider");

require("dotenv").config();
const { MNEMONIC, INFURA_API_KEY } = process.env;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },
    // goerli: {
    //   provider: () => new HDWallet(MNEMONIC, INFURA_API_KEY),
    //   network_id: 5, // Goerli's id
    //   gas: 4465030,
    //   gasPrice: 24293790182,
    // },
    sepolia: {
      provider: () => new HDWallet(MNEMONIC, INFURA_API_KEY),
      network_id: 11155111, // Sepolia's id
      confirmations: 1, // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },

  compilers: {
    solc: {
      version: "^0.4.24",
    },
  },
};
