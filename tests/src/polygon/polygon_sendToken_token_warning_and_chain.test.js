import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AxelarGatewayProxyMultisig";

const testLabel = "polygon_sendToken_token_warning_and_chain";
const testDirSuffix = "sendToken_token_warning_and_chain";
const testNetwork = "polygon";
const signedPlugin = false;

const contractAddr = "0x6f015f16de9fc8791b234ef68d486d2bf203fba8";   // <= Address of the smart contract
const chainID = 137;

// From : https://polygonscan.com/tx/0xd304f6334ec25b6abacbb6cb51a1918b7b2f2641cc4e2b9f67842a6283474fad
// With token address : "61786c5553444355534454000000000000000000000000000000000000000000" === "axlUSDCUSDT" instead of "61786c5553444355534454000000000000000000000000000000000000000000" === "axlUSDC"
const inputData = "0x26ef699d000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000200b2000000000000000000000000000000000000000000000000000000000000000094176616c616e6368650000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a30784144334138376134333438394334346630613841333331313342323734353333386165373141394400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000761786c5553444355534454000000000000000000000000000000000000000000";

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
