import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AxelarGatewayProxyMultisig";

const testLabel = "ethereum_sendToken_normal_flow";
const testDirSuffix = "sendToken_normal_flow";
const testNetwork = "ethereum";
const remoteABI = false;

const contractAddr = "0x4f4495243837681061c4743b74b3eedf548d56a5";   // <= Address of the smart contract
const chainID = 1;

// From : https://etherscan.io/tx/0x5237494084ba48ae207cfdb52d784bfa19315da2def597e4b69668200fd6349c
const inputData = "0x26ef699d000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000c542d700000000000000000000000000000000000000000000000000000000000000066178656c61720000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002d6178656c61723178726377777a72366771777137706836733067393476327968716533766a396d366a7775746c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000045553444300000000000000000000000000000000000000000000000000000000";

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
