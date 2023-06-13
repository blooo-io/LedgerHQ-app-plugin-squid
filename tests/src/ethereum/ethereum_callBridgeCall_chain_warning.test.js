import { processTest, populateTransaction } from "../test.fixture";

const contractName = "SquidRouterProxy";

const testLabel = "ethereum_callBridgeCall_chain_warning";
const testDirSuffix = "callBridgeCall_chain_warning";
const testNetwork = "ethereum";
const remoteABI = false;

const contractAddr = "0xce16f69375520ab01377ce7b88f5ba8c48f8d666";   // <= Address of the smart contract
const chainID = 1;

// From : https://etherscan.io/tx/0x8ecd9a81bbf973969dd188c0ac0386d801d93fcfc51f020b152c42a8a64268b1
// With dest chain string altered : "Optimism" instead of "Avalanche"
const inputData = "0x8ca3bf68000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b1a2bc2ec5000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000003a00000000000000000000000003e897ff1aec9a7b13538f628495fbd90fb0669ff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000084f7074696d69736d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000455534443000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000000e47ff36ab500000000000000000000000000000000000000000000000000000000037766b30000000000000000000000000000000000000000000000000000000000000080000000000000000000000000ce16f69375520ab01377ce7b88f5ba8c48f8d66600000000000000000000000000000000000000000000000000000184c03bd1840000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000320000000000000000000000000000000000000000000000000000000000000052000000000000000000000000000000000000000000000000000000000000006a000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000fab550568c688d5d8a52c7d794cb93edc26ec0ec0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000fab550568c688d5d8a52c7d794cb93edc26ec0ec000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000890f4e345b1daed0367a877a1612f86a1f86985f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000fab550568c688d5d8a52c7d794cb93edc26ec0ec00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000890f4e345b1daed0367a877a1612f86a1f86985f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000c41a4c1ca3000000000000000000000000d7bb79aee866672419999a0496d99c54741d67b5000000000000000000000000fab550568c688d5d8a52c7d794cb93edc26ec0ec000000000000000000000000b97ef9ef8734c71904d8002f8b6bc66dd9c48a6e00000000000000000000000000000000000000000000000000000000037b6cfa00000000000000000000000000000000000000000000000000000000037a898900000000000000000000000028d04fd16b2d7b8c0fdadb821e381b72fe3cc11e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000fab550568c688d5d8a52c7d794cb93edc26ec0ec00000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000001000000000000000000000000b97ef9ef8734c71904d8002f8b6bc66dd9c48a6e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000e54ca86531e17ef3616d22ca28b0d458b6c891060000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000b97ef9ef8734c71904d8002f8b6bc66dd9c48a6e00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e54ca86531e17ef3616d22ca28b0d458b6c89106000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000104676528d100000000000000000000000000000000000000000000000000000000037b6dbe00000000000000000000000000000000000000000000000040c21659bab2a84400000000000000000000000000000000000000000000000000000000000000a00000000000000000000000003e897ff1aec9a7b13538f628495fbd90fb0669ff00000000000000000000000000000000000000000000000000000184c03bd1860000000000000000000000000000000000000000000000000000000000000002000000000000000000000000b97ef9ef8734c71904d8002f8b6bc66dd9c48a6e000000000000000000000000b31f66aa3c1e785363f0875a1b74e27b85fd66c7000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000b97ef9ef8734c71904d8002f8b6bc66dd9c48a6e0000000000000000000000000000000000000000000000000000000000000000";

// Create serializedTx and remove the "0x" prefix
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 6, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 6, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 6, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, "", remoteABI, serializedTx, testNetwork)
);
