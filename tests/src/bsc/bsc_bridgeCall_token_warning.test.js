import { processTest, populateTransaction } from "../test.fixture";

const contractName = "SquidRouterProxy";

const testLabel = "bsc_bridgeCall_token_warning";
const testDirSuffix = "bridgeCall_token_warning";
const testNetwork = "bsc";
const signedPlugin = false;

const contractAddr = "0xce16f69375520ab01377ce7b88f5ba8c48f8d666";   // <= Address of the smart contract
const chainID = 56;

// No bridgeCall transactions yet on BSC, test using a tampered Ethereum transaction
// The token symbol axlUSDT has been replaced with TEST
// From :https://bscscan.com/tx/0x05629b5b0a9745a56398ea8b85a6473a5efa4f88e5381cc01ee589f676bb71db
const inputData = "0x2147796000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000728ce9bc000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000b12a66c70d7a9d1820ad14ddced9993459ab2b200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000754455354000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008457468657265756d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a3078636531364636393337353532306162303133373763653742383866354241384334384638443636360000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000b12a66c70d7a9d1820ad14ddced9993459ab2b2000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000002e000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000044095ea7b300000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc450000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000000e404e45aaf000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec70000000000000000000000000000000000000000000000000000000000000064000000000000000000000000b12a66c70d7a9d1820ad14ddced9993459ab2b20000000000000000000000000000000000000000000000000000000728ce9bc00000000000000000000000000000000000000000000000000000000725c51002b0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000000000004";

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
    processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork)
);
