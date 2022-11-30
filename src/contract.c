#include "<Plugin Name>_plugin.h"

// Need more information about the interface for plugins? Please read the README.md!

// You can check <Plugin Contract Name> methods here
// link:  <Plugin Contract Link>
//
//
static const uint8_t <Plugin Function Name>_GENERIC_SELECTOR[SELECTOR_SIZE] = {0x00, 0x00, 0x00, 0x00};

// Array of all the different LI.FI selectors.
const uint8_t *const  PLUGIN_SELECTORS[NUM_PLUGIN_SELECTORS] = {
    <Plugin Function Name>_GENERIC_SELECTOR,
};

// Ask dummy address ETH
// Remove if not used
const uint8_t PLUGIN_ETH_ADDRESS[ADDRESS_LENGTH] = {0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee,
                                                    0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee,
                                                    0xee, 0xee, 0xee, 0xee, 0xee, 0xee};

// Remove if not used
const uint8_t PLUGIN_ETH_ADDRESS[ADDRESS_LENGTH] = {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                                                    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                                                    0x00, 0x00, 0x00, 0x00, 0x00, 0x00};
