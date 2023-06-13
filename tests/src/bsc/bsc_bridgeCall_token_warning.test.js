import { processTest, populateTransaction } from "../test.fixture";

const contractName = "SquidRouterProxy";

const testLabel = "bsc_bridgeCall_token_warning";
const testDirSuffix = "bridgeCall_token_warning";
const testNetwork = "bsc";
const remoteABI = false;

const contractAddr = "0xce16f69375520ab01377ce7b88f5ba8c48f8d666";   // <= Address of the smart contract
const chainID = 56;

// No bridgeCall transactions yet on BSC, test using a tampered Ethereum transaction
// The token symbol USDC has been replaced with TEST
// From :https://etherscan.io/tx/0xc1f758e2c2fcad2ff0846e480396d0f6874a94d2b3ba1c38d5d368a7c027ee29
const inputData = "0x3c65974100000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000f42400000000000000000000000000000000000000000000000000000000000000140000000000000000000000000ad3a87a43489c44f0a8a33113b2745338ae71a9d00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000007506f6c79676f6e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000045445535400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000320000000000000000000000000000000000000000000000000000000000000052000000000000000000000000000000000000000000000000000000000000006a000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000750e4c4984a9e0f12978ea6742bc1c5d248f40ed0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000750e4c4984a9e0f12978ea6742bc1c5d248f40ed000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000a522deb6f17853f3a97a65d0972a50bdc3b1afff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000750e4c4984a9e0f12978ea6742bc1c5d248f40ed00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a522deb6f17853f3a97a65d0972a50bdc3b1afff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000c41a4c1ca3000000000000000000000000fba3b7bb043415035220b1c44fb4756434639392000000000000000000000000750e4c4984a9e0f12978ea6742bc1c5d248f40ed0000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa8417400000000000000000000000000000000000000000000000000000000000f424000000000000000000000000000000000000000000000000000000000000f38d800000000000000000000000028d04fd16b2d7b8c0fdadb821e381b72fe3cc11e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000750e4c4984a9e0f12978ea6742bc1c5d248f40ed000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000010000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000a5e0829caced8ffdd4de3c43696c57f7d7a678ff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa8417400000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a5e0829caced8ffdd4de3c43696c57f7d7a678ff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000010418cbafe500000000000000000000000000000000000000000000000000000000000f3cbf0000000000000000000000000000000000000000000000000f0ba2077853d93500000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000ad3a87a43489c44f0a8a33113b2745338ae71a9d00000000000000000000000000000000000000000000000000000184fdd0736a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000000000000000000000000000000000000000000";

// Create serializedTx and remove the "0x" prefix
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 7, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 7, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 7, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, "", remoteABI, serializedTx, testNetwork)
);
