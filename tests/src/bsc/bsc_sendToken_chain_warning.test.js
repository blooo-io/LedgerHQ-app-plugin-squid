import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AxelarGatewayProxyMultisig";

const testLabel = "bsc_sendToken_chain_warning";
const testDirSuffix = "sendToken_chain_warning";
const testNetwork = "bsc";
const signedPlugin = false;

const contractAddr = "0x304acf330bbe08d1e512eefaa92f6a57871fd895";   // <= Address of the smart contract
const chainID = 56;

// From :https://bscscan.com/tx/0x5a81156175cd1d51c2d2832665eb5fb3896bc148873db39746a24c20232520b1
// With dest chain string altered : "457468657265756d506f6c79676f6e4253430000000000000000000000000000" === "EthereumPolygonBSC" instead of "706f6c79676f6e00000000000000000000000000000000000000000000000000" === "polygon"
const inputData = "0x26ef699d000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000007a1200000000000000000000000000000000000000000000000000000000000000007457468657265756d506f6c79676f6e4253430000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a30783237303264383963316338363538623439633435646434363064656562636334356661656330336300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000761786c5553444300000000000000000000000000000000000000000000000000";

// Create serializedTx and remove the "0x" prefix
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 10, // <= Define the number of steps for this test case and this device
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
    processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork)
);
