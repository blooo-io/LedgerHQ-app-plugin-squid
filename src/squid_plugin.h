#pragma once

#include <string.h>
#include "eth_internals.h"
#include "eth_plugin_interface.h"

#define PARAMETER_LENGTH 32
#define SELECTOR_SIZE    4

#define RUN_APPLICATION 1

#define NUM_SQUID_SELECTORS 2
#define SELECTOR_SIZE       4

#define PLUGIN_NAME "Squid"

#define TOKEN_SENT_FOUND     1       // REMOVE IF NOT NEEDED
#define TOKEN_RECEIVED_FOUND 1 << 1  // REMOVE IF NOT NEEDED

#define NUM_SUPPORTED_CHAINS 3
#define NUM_SUPPORTED_TOKENS 22

typedef struct tokenSymbolToDecimals_t {
    char token_symbol[MAX_TICKER_LEN];
    uint8_t decimals_sent;
} tokenSymbolToDecimals_t;

extern const uint8_t PLUGIN_ETH_ADDRESS[ADDRESS_LENGTH];  // REMOVE IF NOT NEEDED
extern const uint8_t NULL_ETH_ADDRESS[ADDRESS_LENGTH];    // REMOVE IF NOT NEEDED

extern const char SQUID_SUPPORTED_CHAINS[NUM_SUPPORTED_CHAINS][PARAMETER_LENGTH];
extern const struct tokenSymbolToDecimals_t SQUID_SUPPORTED_TOKENS[NUM_SUPPORTED_TOKENS];
// Returns 1 if corresponding address is the address for the chain token (ETH, BNB, MATIC,
#define ADDRESS_IS_NETWORK_TOKEN(_addr)                    \
    (!memcmp(_addr, PLUGIN_ETH_ADDRESS, ADDRESS_LENGTH) || \
     !memcmp(_addr, NULL_ETH_ADDRESS, ADDRESS_LENGTH))

typedef enum { CALL_BRIDGE_CALL, BRIDGE_CALL } pluginSelector_t;

extern const uint8_t *const SQUID_SELECTORS[NUM_SQUID_SELECTORS];

typedef enum {
    SEND_SCREEN,
    TO_ASSET_SCREEN,
    DEST_CHAIN_SCREEN,
    WARN_TOKEN_SCREEN,
    WARN_CHAIN_SCREEN,
    ERROR,
} screens_t;

#define AMOUNT_SENT        0  // Amount sent by the user to the contract.
#define AMOUNT_RECEIVED    1  // Amount sent by the contract to the user.
#define TOKEN_SENT         2
#define SAVE_SYMBOL_OFFSET 3
#define SAVE_CHAIN_OFFSET  4
#define SKIP               5
#define ADDRESS_RECEIVER   6
#define DEST_CHAIN         7
#define SKIP_2             8
#define TOKEN_SYMBOL       9
#define NONE               10  // Placeholder variant to be set when parsing is done.

// Number of decimals used when the token wasn't found in the CAL.
#define DEFAULT_DECIMAL WEI_TO_ETHER

// Ticker used when the token wasn't found in the CAL.
#define DEFAULT_TICKER ""

// Shared global memory with Ethereum app. Must be at most 5 * 32 bytes.
typedef struct squid_parameters_t {
    uint8_t amount_sent[INT256_LENGTH];
    char dest_chain[PARAMETER_LENGTH];
    uint8_t token_sent[ADDRESS_LENGTH];
    uint8_t token_received[ADDRESS_LENGTH];
    char token_symbol[MAX_TICKER_LEN];
    char ticker_sent[MAX_TICKER_LEN];
    char ticker_received[MAX_TICKER_LEN];

    uint16_t offset;
    uint16_t saved_offset_1;
    uint16_t saved_offset_2;
    uint16_t checkpoint;
    uint8_t next_param;
    uint8_t tokens_found;
    uint8_t valid;
    uint8_t decimals_sent;
    uint8_t decimals_received;
    uint8_t selectorIndex;
    uint8_t flags;
    uint8_t skip;
} squid_parameters_t;  // Remove any variable not used
// 32*2 + 2*20 + 12*3 = 140
// 2*4 + 1*8 = 16
// 16+140 = 156

// Piece of code that will check that the above structure is not bigger than 5 * 32.
// Do not remove this check.
_Static_assert(sizeof(squid_parameters_t) <= 5 * 32, "Structure of parameters too big.");

void handle_provide_parameter(void *parameters);
void handle_query_contract_ui(void *parameters);
void handle_finalize(void *parameters);
void handle_init_contract(void *parameters);
void handle_provide_token(void *parameters);
void handle_query_contract_id(void *parameters);

static inline void printf_hex_array(const char *title __attribute__((unused)),
                                    size_t len __attribute__((unused)),
                                    const uint8_t *data __attribute__((unused))) {
    PRINTF(title);
    for (size_t i = 0; i < len; ++i) {
        PRINTF("%02x", data[i]);
    };
    PRINTF("\n");
}

static inline bool is_chain_supported(squid_parameters_t *context) {
    for (size_t i = 0; i < NUM_SUPPORTED_CHAINS; i++) {
        if (!memcmp(context->dest_chain, SQUID_SUPPORTED_CHAINS[i], PARAMETER_LENGTH)) {
            return 1;
        }
    }
    return 0;
}