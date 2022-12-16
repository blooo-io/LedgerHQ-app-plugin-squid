#include "squid_plugin.h"

static void sent_network_token(squid_parameters_t *context) {
    context->decimals_sent = WEI_TO_ETHER;
    context->tokens_found |= TOKEN_SENT_FOUND;
}

static bool set_ticker_for_mapped_token(squid_parameters_t *context) {
    for (size_t i = 0; i < NUM_SUPPORTED_TOKENS; i++) {
        if (!memcmp(context->token_symbol,
                    SQUID_SUPPORTED_TOKENS[i].token_symbol,
                    MAX_TICKER_LEN)) {
            char ticker[MAX_TICKER_LEN];
            strlcpy(ticker, (char *) SQUID_SUPPORTED_TOKENS[i].token_symbol, sizeof(ticker));
            strlcat(ticker, " ", sizeof(ticker));
            strlcpy(context->ticker_sent, (char *) ticker, sizeof(context->ticker_sent));
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
        switch (context->selectorIndex) {
            case CALL_BRIDGE_CALL:
            case CALL_BRIDGE:
                msg->numScreens = 3;
                if (!ADDRESS_IS_NETWORK_TOKEN(context->token_sent)) {
                    // Address is not network token (0x000...) so we will look up the token in
                    // the CAL.
                    printf_hex_array("Setting token sent to: ",
                                     ADDRESS_LENGTH,
                                     context->token_sent);
                    msg->tokenLookup1 = context->token_sent;
                } else {
                    sent_network_token(context);
                    msg->tokenLookup1 = NULL;
                }
                break;
            case BRIDGE_CALL:
                msg->numScreens = 2;
                msg->tokenLookup1 = NULL;
                // check supported tokens custom mapping
                // and set decimals for the specified token
                bool success = set_ticker_for_mapped_token(context);
                if (!success) {
                    // The token was not found in custom mapping
                    context->decimals_sent = DEFAULT_DECIMAL;
                    strlcpy(context->ticker_sent, DEFAULT_TICKER, sizeof(context->ticker_sent));
                    // // We will need an additional screen to display a warning message.
                    msg->numScreens++;
                    PRINTF("Token not found in mapping\n");
                }
                break;
            default:
                PRINTF("Selector Index %d not supported\n", context->selectorIndex);
                msg->result = ETH_PLUGIN_RESULT_ERROR;
                break;
                break;
        }

        if (!is_chain_supported(context)) {
            // Add a warning screen if the dest chain is not supported
            msg->numScreens++;
        }

        msg->uiType = ETH_UI_TYPE_GENERIC;
        msg->result = ETH_PLUGIN_RESULT_OK;
    } else {
        PRINTF("Context not valid\n");
        msg->result = ETH_PLUGIN_RESULT_FALLBACK;
    }
}
