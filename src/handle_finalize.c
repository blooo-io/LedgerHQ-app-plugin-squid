#include "squid_plugin.h"

static void sent_network_token(squid_parameters_t *context) {
    context->decimals_sent = WEI_TO_ETHER;
    context->tokens_found |= TOKEN_SENT_FOUND;
}

static void received_network_token(squid_parameters_t *context) {
    context->decimals_received = WEI_TO_ETHER;
    context->tokens_found |= TOKEN_RECEIVED_FOUND;
}

static bool mapped_sent_token(squid_parameters_t *context) {
    for (size_t i = 0; i < NUM_SUPPORTED_TOKENS; i++) {
        if (!memcmp(context->token_symbol,
                    SQUID_SUPPORTED_TOKENS[i].token_symbol,
                    MAX_TICKER_LEN)) {
            context->decimals_sent = SQUID_SUPPORTED_TOKENS[i].decimals_sent;
            context->tokens_found |= TOKEN_SENT_FOUND;
            return 1;
        }
    }
    return 0;
}

void handle_finalize(void *parameters) {
    ethPluginFinalize_t *msg = (ethPluginFinalize_t *) parameters;
    squid_parameters_t *context = (squid_parameters_t *) msg->pluginContext;
    if (context->valid) {
        msg->numScreens = 3;
        switch (context->selectorIndex) {
            case CALL_BRIDGE_CALL:
                if (!ADDRESS_IS_NETWORK_TOKEN(context->token_sent)) {
                    // Address is not network token (0x000...) so we will look up the token in the
                    // CAL.
                    printf_hex_array("Setting token sent to: ",
                                     ADDRESS_LENGTH,
                                     context->token_sent);
                    msg->tokenLookup1 = context->token_sent;
                } else {
                    sent_network_token(context);
                    msg->tokenLookup1 = NULL;
                }

                if (!is_chain_supported(context)) {
                    // Add a warning screen if the dest chain is not supported
                    msg->numScreens += 1;
                }
                break;
            case BRIDGE_CALL:
                // check supported tokens custom mapping
                // and set decimals for the specified token
                if (!mapped_sent_token(context)) {
                    PRINTF("Token not found in mapping\n");
                    msg->result = ETH_PLUGIN_RESULT_ERROR;
                }
                break;
            default:
                PRINTF("Selector Index %d not supported\n", context->selectorIndex);
                msg->result = ETH_PLUGIN_RESULT_ERROR;
                break;
                break;
        }

        // if (!ADDRESS_IS_NETWORK_TOKEN(context->token_received)) {
        //     // Address is not network token (0xeee...) so we will look up the token in the CAL.
        //     printf_hex_array("Setting address received to: ",
        //                      ADDRESS_LENGTH,
        //                      context->token_received);
        //     msg->tokenLookup2 = context->token_received;
        // } else {
        //     received_network_token(context);
        //     msg->tokenLookup2 = NULL;
        // }

        msg->uiType = ETH_UI_TYPE_GENERIC;
        msg->result = ETH_PLUGIN_RESULT_OK;
    } else {
        PRINTF("Context not valid\n");
        msg->result = ETH_PLUGIN_RESULT_FALLBACK;
    }
}
