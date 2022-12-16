#include "squid_plugin.h"

// Need more information about the interface for plugins? Please read the README.md!

// You can check <Plugin Contract Name> methods here
// link:  <Plugin Contract Link>
//

// callBridgeCall : 0x8ca3bf68
static const uint8_t SQUID_CALL_BRIDGE_CALL_SELECTOR[SELECTOR_SIZE] = {0x8c, 0xa3, 0xbf, 0x68};

// bridgeCall : 0x3c659741
static const uint8_t SQUID_BRIDGE_CALL_SELECTOR[SELECTOR_SIZE] = {0x3c, 0x65, 0x97, 0x41};

// callBridge : 0xf35af1f8
static const uint8_t SQUID_CALL_BRIDGE_SELECTOR[SELECTOR_SIZE] = {0xf3, 0x5a, 0xf1, 0xf8};

// Array of all the different Squid selectors.
const uint8_t *const SQUID_SELECTORS[NUM_SQUID_SELECTORS] = {SQUID_CALL_BRIDGE_CALL_SELECTOR,
                                                             SQUID_BRIDGE_CALL_SELECTOR,
                                                             SQUID_CALL_BRIDGE_SELECTOR};

// Ask dummy address ETH
// Remove if not used
const uint8_t PLUGIN_ETH_ADDRESS[ADDRESS_LENGTH] = {0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee,
                                                    0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee,
                                                    0xee, 0xee, 0xee, 0xee, 0xee, 0xee};

// Remove if not used
const uint8_t NULL_ETH_ADDRESS[ADDRESS_LENGTH] = {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                                                  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                                                  0x00, 0x00, 0x00, 0x00, 0x00, 0x00};

const char SQUID_SUPPORTED_CHAINS[NUM_SUPPORTED_CHAINS][PARAMETER_LENGTH] = {"Ethereum",
                                                                             "Polygon",
                                                                             "BSC"};

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
};