import { processTest, populateTransaction } from "../test.fixture";

const contractName = "SquidRouterProxy";

const testLabel = "polygon_callBridgeCall_token_and_chain_warning";
const testDirSuffix = "callBridgeCall_token_and_chain_warning";
const testNetwork = "polygon";
const remoteABI = false;

const contractAddr = "0xce16f69375520ab01377ce7b88f5ba8c48f8d666";   // <= Address of the smart contract
const chainID = 137;

// From : https://polygonscan.com/tx/0xb5d01feab1da25122c7e3223de110e2237732ede3fed801d736e979d96fa3888
// With dest chain string altered : "Optimism" instead of "Avalanche"
const inputData = "0x8ca3bf680000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000000000000000000000000000001bc16d674ec8000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000008e0000000000000000000000000b13cd07b22bc5a69f8500a1cb3a1b65618d50b22000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000084f7074696d69736d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000761786c55534443000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000003c0000000000000000000000000000000000000000000000000000000000000054000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000a5e0829caced8ffdd4de3c43696c57f7d7a678ff0000000000000000000000000000000000000000000000001bc16d674ec800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a5e0829caced8ffdd4de3c43696c57f7d7a678ff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000010438ed17390000000000000000000000000000000000000000000000001bc16d674ec8000000000000000000000000000000000000000000000000000000000000001bce1600000000000000000000000000000000000000000000000000000000000000a000000000000000000000000028d04fd16b2d7b8c0fdadb821e381b72fe3cc11e00000000000000000000000000000000000000000000000000000184e596f0e400000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa8417400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000a522deb6f17853f3a97a65d0972a50bdc3b1afff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa8417400000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a522deb6f17853f3a97a65d0972a50bdc3b1afff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000c41a4c1ca3000000000000000000000000fba3b7bb043415035220b1c44fb47564346393920000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000750e4c4984a9e0f12978ea6742bc1c5d248f40ed00000000000000000000000000000000000000000000000000000000001beacb00000000000000000000000000000000000000000000000000000000001bdc0d000000000000000000000000ce16f69375520ab01377ce7b88f5ba8c48f8d6660000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000320000000000000000000000000000000000000000000000000000000000000052000000000000000000000000000000000000000000000000000000000000006a000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000fab550568c688d5d8a52c7d794cb93edc26ec0ec0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000fab550568c688d5d8a52c7d794cb93edc26ec0ec000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000890f4e345b1daed0367a877a1612f86a1f86985f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000fab550568c688d5d8a52c7d794cb93edc26ec0ec00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000890f4e345b1daed0367a877a1612f86a1f86985f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000c41a4c1ca3000000000000000000000000d7bb79aee866672419999a0496d99c54741d67b5000000000000000000000000fab550568c688d5d8a52c7d794cb93edc26ec0ec000000000000000000000000b97ef9ef8734c71904d8002f8b6bc66dd9c48a6e00000000000000000000000000000000000000000000000000000000001be33100000000000000000000000000000000000000000000000000000000001bdc4900000000000000000000000028d04fd16b2d7b8c0fdadb821e381b72fe3cc11e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000fab550568c688d5d8a52c7d794cb93edc26ec0ec00000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000001000000000000000000000000b97ef9ef8734c71904d8002f8b6bc66dd9c48a6e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000e54ca86531e17ef3616d22ca28b0d458b6c891060000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000b97ef9ef8734c71904d8002f8b6bc66dd9c48a6e00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e54ca86531e17ef3616d22ca28b0d458b6c89106000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000104676528d100000000000000000000000000000000000000000000000000000000001be36d00000000000000000000000000000000000000000000000001d9a982d5b5cf1a00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000b13cd07b22bc5a69f8500a1cb3a1b65618d50b2200000000000000000000000000000000000000000000000000000184e596f0e60000000000000000000000000000000000000000000000000000000000000002000000000000000000000000b97ef9ef8734c71904d8002f8b6bc66dd9c48a6e000000000000000000000000b31f66aa3c1e785363f0875a1b74e27b85fd66c7000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000b97ef9ef8734c71904d8002f8b6bc66dd9c48a6e0000000000000000000000000000000000000000000000000000000000000000";

// Create serializedTx and remove the "0x" prefix
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 8, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 8, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 8, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, "", remoteABI, serializedTx, testNetwork)
);
