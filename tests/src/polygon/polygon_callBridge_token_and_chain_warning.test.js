import { processTest, populateTransaction } from "../test.fixture";

const contractName = "SquidRouterProxy";

const testLabel = "polygon_callBridge_token_and_chain_warning";
const testDirSuffix = "callBridge_token_and_chain_warning";
const testNetwork = "polygon";
const signedPlugin = false;

const contractAddr = "0xce16f69375520ab01377ce7b88f5ba8c48f8d666";   // <= Address of the smart contract
const chainID = 137;

// From : https://polygonscan.com/tx/0x079cce1d0a1de4a7f13b13c21e6b63ece3de7496f8c5306a8aa037d795a30515
// With token altered : 0x00000000000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF instead of 0x000...000
// With dest chain string altered : "Optimism" instead of "cosmoshub"
const inputData = "0xf35af1f800000000000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0000000000000000000000000000000000000000000000004563918244f4000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000084f7074696d69736d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002d636f736d6f7331727a3370306433616b3966786870666c7434776736656e61667775797772793536727837377900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000761786c555344430000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000003c00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a5e0829caced8ffdd4de3c43696c57f7d7a678ff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000000e47ff36ab5000000000000000000000000000000000000000000000000000000000045d084000000000000000000000000000000000000000000000000000000000000008000000000000000000000000028d04fd16b2d7b8c0fdadb821e381b72fe3cc11e00000000000000000000000000000000000000000000000000000184f6fdec3e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa8417400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000a522deb6f17853f3a97a65d0972a50bdc3b1afff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa8417400000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a522deb6f17853f3a97a65d0972a50bdc3b1afff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000c41a4c1ca3000000000000000000000000fba3b7bb043415035220b1c44fb47564346393920000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000750e4c4984a9e0f12978ea6742bc1c5d248f40ed00000000000000000000000000000000000000000000000000000000004672fe0000000000000000000000000000000000000000000000000000000000465001000000000000000000000000ce16f69375520ab01377ce7b88f5ba8c48f8d6660000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000000000000000000000000000000000000000003";

// Create serializedTx and remove the "0x" prefix
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 9, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 9, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 9, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork)
);
