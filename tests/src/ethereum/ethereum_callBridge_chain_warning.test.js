import { processTest, populateTransaction } from "../test.fixture";

const contractName = "SquidRouterProxy";

const testLabel = "ethereum_callBridge_chain_warning";
const testDirSuffix = "callBridge_chain_warning";
const testNetwork = "ethereum";
const signedPlugin = false;

const contractAddr = "0xce16f69375520ab01377ce7b88f5ba8c48f8d666";   // <= Address of the smart contract
const chainID = 1;

// From : https://etherscan.io/tx/0x34f4e3a86e07d6f3ce54462e8b59b81fadf9ab439ef9f9b6c68117d5facd4255
// With dest chain string altered : "Optimism" instead of "kujira"
const inputData = "0xf35af1f800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001f399b1438a1000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000084f7074696d69736d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002d6b756a697261316778383267616b34653465327777663577676676343574666e75336d6830646d33776d796c7300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000457455448000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000001f399b1438a1000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000004d0e30db00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000006423b872dd00000000000000000000000028d04fd16b2d7b8c0fdadb821e381b72fe3cc11e000000000000000000000000ce16f69375520ab01377ce7b88f5ba8c48f8d6660000000000000000000000000000000000000000000000001f399b1438a10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

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
