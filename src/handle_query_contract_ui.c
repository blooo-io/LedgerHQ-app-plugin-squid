#include "squid_plugin.h"

// Set UI for the "Send" screen.
static void set_send_ui(ethQueryContractUI_t *msg, squid_parameters_t *context) {
    strlcpy(msg->title, "Send", msg->titleLength);
    switch (context->selectorIndex) {
        case CALL_BRIDGE_CALL:
        case CALL_BRIDGE:
            // set network ticker (ETH, BNB, etc) if needed
            if (ADDRESS_IS_NETWORK_TOKEN(context->token_sent)) {
                strlcpy(context->ticker_sent, msg->network_ticker, sizeof(context->ticker_sent));
            }
            break;
        case BRIDGE_CALL:
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }
    amountToString(context->amount_sent,
                   INT256_LENGTH,
                   context->decimals_sent,
                   context->ticker_sent,
                   msg->msg,
                   msg->msgLength);
    PRINTF("AMOUNT SENT: %s\n", msg->msg);
}

// Set UI for "To Asset" screen.
static void set_to_asset_ui(ethQueryContractUI_t *msg, squid_parameters_t *context) {
    strlcpy(msg->title, "To Asset", msg->titleLength);
    strlcpy(msg->msg, context->token_symbol, msg->msgLength);
}

// Set UI for "Destination Chain" screen.
static void set_dest_chain_ui(ethQueryContractUI_t *msg, squid_parameters_t *context) {
    strlcpy(msg->title, "To Chain", msg->titleLength);
    strlcpy(msg->msg, context->dest_chain, msg->msgLength);
}

// Set UI for "Warning" screen for the token.
static void set_token_warning_ui(ethQueryContractUI_t *msg,
                                 const squid_parameters_t *context __attribute__((unused))) {
    strlcpy(msg->title, "WARNING", msg->titleLength);
    strlcpy(msg->msg, "Unknown token", msg->msgLength);
}

// Set UI for "Warning" screen for the destination chain.
static void set_chain_warning_ui(ethQueryContractUI_t *msg,
                                 const squid_parameters_t *context __attribute__((unused))) {
    strlcpy(msg->title, "WARNING", msg->titleLength);
    strlcpy(msg->msg, "Unsupported chain", msg->msgLength);
}

// Helper function that returns the enum corresponding to the screen that should be displayed.
static screens_t get_screen(ethQueryContractUI_t *msg,
                            squid_parameters_t *context __attribute__((unused))) {
    uint8_t index = msg->screenIndex;

    bool token_sent_found = context->tokens_found & TOKEN_SENT_FOUND;
    bool chain_supported = is_chain_supported(context);

    PRINTF("token_sent_found: %d\n", token_sent_found);
    PRINTF("chain_supported: %d\n", chain_supported);

    switch (context->selectorIndex) {
        case CALL_BRIDGE_CALL:
        case CALL_BRIDGE:
            switch (index) {
                case 0:
                    if (token_sent_found) {
                        return SEND_SCREEN;
                    } else {
                        return WARN_TOKEN_SCREEN;
                    }
                case 1:
                    if (token_sent_found) {
                        return TO_ASSET_SCREEN;
                    } else {
                        return SEND_SCREEN;
                    }
                case 2:
                    if (token_sent_found && chain_supported) {
                        return DEST_CHAIN_SCREEN;
                    } else if (token_sent_found && !chain_supported) {
                        return WARN_CHAIN_SCREEN;
                    } else if (!token_sent_found) {
                        return TO_ASSET_SCREEN;
                    }

                case 3:
                    if (token_sent_found && chain_supported) {
                        return ERROR_SCREEN;
                    } else if (!token_sent_found && chain_supported) {
                        return DEST_CHAIN_SCREEN;
                    } else if (token_sent_found && !chain_supported) {
                        return DEST_CHAIN_SCREEN;
                    } else if (!token_sent_found && !chain_supported) {
                        return WARN_CHAIN_SCREEN;
                    }
                case 4:
                    if (!token_sent_found && !chain_supported) {
                        return DEST_CHAIN_SCREEN;
                    } else {
                        return ERROR_SCREEN;
                    }
                default:
                    return ERROR_SCREEN;
            }
            break;
        case BRIDGE_CALL:
            switch (index) {
                case 0:
                    if (token_sent_found) {
                        return SEND_SCREEN;
                    } else {
                        return WARN_TOKEN_SCREEN;
                    }
                case 1:
                    if (token_sent_found && chain_supported) {
                        return DEST_CHAIN_SCREEN;
                    } else if (token_sent_found && !chain_supported) {
                        return WARN_CHAIN_SCREEN;
                    } else if (!token_sent_found) {
                        return SEND_SCREEN;
                    }
                case 2:
                    if (token_sent_found && chain_supported) {
                        return ERROR_SCREEN;
                    } else if (!token_sent_found && chain_supported) {
                        return DEST_CHAIN_SCREEN;
                    } else if (token_sent_found && !chain_supported) {
                        return DEST_CHAIN_SCREEN;
                    } else if (!token_sent_found && !chain_supported) {
                        return WARN_CHAIN_SCREEN;
                    }
                case 3:
                    if (!token_sent_found && !chain_supported) {
                        return DEST_CHAIN_SCREEN;
                    } else {
                        return ERROR_SCREEN;
                    }
                default:
                    return ERROR_SCREEN;
            }
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return ERROR_SCREEN;
    }
    return ERROR_SCREEN;
}

void handle_query_contract_ui(void *parameters) {
    ethQueryContractUI_t *msg = (ethQueryContractUI_t *) parameters;
    squid_parameters_t *context = (squid_parameters_t *) msg->pluginContext;
    memset(msg->title, 0, msg->titleLength);
    memset(msg->msg, 0, msg->msgLength);
    msg->result = ETH_PLUGIN_RESULT_OK;

    screens_t screen = get_screen(msg, context);
    switch (screen) {
        case SEND_SCREEN:
            set_send_ui(msg, context);
            break;
        case TO_ASSET_SCREEN:
            set_to_asset_ui(msg, context);
            break;
        case DEST_CHAIN_SCREEN:
            set_dest_chain_ui(msg, context);
            break;
        case WARN_TOKEN_SCREEN:
            set_token_warning_ui(msg, context);
            break;
        case WARN_CHAIN_SCREEN:
            set_chain_warning_ui(msg, context);
            break;
        default:
            PRINTF("Received an invalid screenIndex %d\n", screen);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }
}
