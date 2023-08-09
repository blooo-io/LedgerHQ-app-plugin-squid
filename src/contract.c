#include "squid_plugin.h"

// Need more information about the interface for plugins? Please read the README.md!

// You can check SquidRouterProxy's methods here :
// https://etherscan.io/address/0xce16f69375520ab01377ce7b88f5ba8c48f8d666#code
//

// callBridgeCall : 0x846a1bc6
static const uint8_t SQUID_CALL_BRIDGE_CALL_SELECTOR[SELECTOR_SIZE] = {0x84, 0x6a, 0x1b, 0xc6};

// bridgeCall : 0x21477960
static const uint8_t SQUID_BRIDGE_CALL_SELECTOR[SELECTOR_SIZE] = {0x21, 0x47, 0x79, 0x60};

// callBridge : 0xf35af1f8
static const uint8_t SQUID_CALL_BRIDGE_SELECTOR[SELECTOR_SIZE] = {0xf3, 0x5a, 0xf1, 0xf8};

// sendToken : 0x26ef699d
static const uint8_t SQUID_SEND_TOKEN_SELECTOR[SELECTOR_SIZE] = {0x26, 0xef, 0x69, 0x9d};

// Array of all the different Squid selectors.
const uint8_t *const SQUID_SELECTORS[NUM_SQUID_SELECTORS] = {SQUID_CALL_BRIDGE_CALL_SELECTOR,
                                                             SQUID_BRIDGE_CALL_SELECTOR,
                                                             SQUID_CALL_BRIDGE_SELECTOR,
                                                             SQUID_SEND_TOKEN_SELECTOR};

const uint8_t NULL_ETH_ADDRESS[ADDRESS_LENGTH] = {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                                                  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                                                  0x00, 0x00, 0x00, 0x00, 0x00, 0x00};

const uint8_t NETWORK_ETH_ADDRESS[ADDRESS_LENGTH] = {0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee,
                                                     0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee,
                                                     0xee, 0xee, 0xee, 0xee, 0xee, 0xee};

// Array containing the chains supported by squid
const struct chainIdToChainName_t SQUID_SUPPORTED_CHAINS[NUM_SUPPORTED_CHAINS] = {
    {"Ethereum", "Ethereum"},
    {"Arbitrum", "Arbitrum"},
    {"Avalanche", "Avalanche C-Chain"},
    {"Moonbeam", "Moonbeam Mainnet"},
    {"Polygon", "Polygon"},
    {"polygon", "Polygon"},
    {"binance", "Binance"},
    {"cosmoshub", "Cosmos Hub"},
    {"crescent", "Crescent"},
    {"injective", "Injective"},
    {"juno", "Juno"},
    {"kujira", "Kujira"},
    {"osmosis", "Osmosis"},
    {"secret", "Secret Network"},
    {"terra-2", "Terra-2"},
    {"Agoric", "Agoric"},
    {"ASSETMANTLE", "AssetMantle"},
    {"Axelarnet", "Axelar"},
    {"axelar", "Axelar"},
    {"COMDEX", "Comdex"},
    {"EVMOS", "Evmos"},
    {"fetch", "Fetch"},
    {"KI", "Ki"},
    {"REGEN", "Regen"},
    {"UMEE", "Umee"},
    {"kava", "Kava"},
};

// Array containing the most used tokens supported by squid
// each represented with their symbol and decimals
const struct tokenSymbolToDecimals_t SQUID_SUPPORTED_TOKENS[NUM_SUPPORTED_TOKENS] = {
    {"ETH", 18},
    {"WETH", 18},
    {"DAI", 18},
    {"USDT", 6},
    {"USDC", 6},
    {"WBTC", 8},
    {"MATIC", 18},
    {"BNB", 18},
    {"BUSD", 18},
    {"wAXL", 6},
    {"axlUSDC", 6},
    {"axlDAI", 18},
    {"axlUSDT", 6},
    {"WMATIC", 18},
    {"WBNB", 18},
    {"WGLMR", 18},
    {"WFTM", 18},
    {"WAVAX", 18},
};