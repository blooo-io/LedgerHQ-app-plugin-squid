#include "squid_plugin.h"

// Store the amount sent in the form of a string, without any ticker or decimals. These will be
// added when displaying.
static void handle_amount_sent(ethPluginProvideParameter_t *msg, squid_parameters_t *context) {
    memcpy(context->amount_sent, msg->parameter, INT256_LENGTH);
}

static void handle_token_sent(ethPluginProvideParameter_t *msg, squid_parameters_t *context) {
    memset(context->token_sent, 0, sizeof(context->token_sent));
    memcpy(context->token_sent, msg->parameter, ADDRESS_LENGTH);
}

static void handle_dest_chain(ethPluginProvideParameter_t *msg, squid_parameters_t *context) {
    memcpy(context->dest_chain, msg->parameter, PARAMETER_LENGTH);
}

static void handle_token_symbol(ethPluginProvideParameter_t *msg, squid_parameters_t *context) {
    memcpy(context->token_symbol, msg->parameter, MAX_TICKER_LEN);
}

static void handle_call_bridge_call(ethPluginProvideParameter_t *msg, squid_parameters_t *context) {
    switch (context->next_param) {
        case TOKEN_SENT:
            handle_token_sent(msg, context);
            printf_hex_array("Token sent: 0x", ADDRESS_LENGTH, context->token_sent);
            context->next_param = AMOUNT_SENT;
            break;
        case AMOUNT_SENT:
            handle_amount_sent(msg, context);
            printf_hex_array("Amount sent:", INT256_LENGTH, context->amount_sent);
            context->next_param = SAVE_CHAIN_OFFSET;
            break;
        case SAVE_CHAIN_OFFSET:
            context->saved_offset =
                U2BE(msg->parameter, PARAMETER_LENGTH - sizeof(context->saved_offset));
            context->next_param = SAVE_SYMBOL_OFFSET;
            break;
        case SAVE_SYMBOL_OFFSET:
            // Go to dest chain offset next
            context->offset = context->saved_offset;
            // Save token symbol offset
            context->saved_offset =
                U2BE(msg->parameter, PARAMETER_LENGTH - sizeof(context->offset));
            PRINTF("offset = %i\n", context->offset);
            context->next_param = SKIP;
            break;
        case SKIP:
            // Skip num of characters declaration for dest chain string
            // Already skipped 1 by going in this case
            context->skip += 0;
            context->next_param = DEST_CHAIN;
            break;
        case DEST_CHAIN:
            handle_dest_chain(msg, context);
            PRINTF("dest chain: %s\n", context->dest_chain);
            // go to previously saved offset
            context->offset = context->saved_offset;
            context->next_param = SKIP_2;
            break;
        case SKIP_2:
            // Skip num of characters declaration for token symbol string
            // Already skipped 1 by going in this case
            context->skip += 0;
            context->next_param = TOKEN_SYMBOL;
            break;
        case TOKEN_SYMBOL:
            handle_token_symbol(msg, context);
            PRINTF("token symbol: %s\n", context->token_symbol);
            context->next_param = NONE;
            break;
        case NONE:
            break;
        default:
            PRINTF("Param not supported\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            break;
    }
}

void handle_provide_parameter(void *parameters) {
    ethPluginProvideParameter_t *msg = (ethPluginProvideParameter_t *) parameters;
    squid_parameters_t *context = (squid_parameters_t *) msg->pluginContext;
    printf_hex_array("Squid plugin provide parameter: ", PARAMETER_LENGTH, msg->parameter);
    PRINTF("param offset: %d\n", msg->parameterOffset);

    msg->result = ETH_PLUGIN_RESULT_OK;

    // If not used remove from here
    if (context->skip) {
        // Skip this step, and don't forget to decrease skipping counter.
        context->skip--;
    } else {
        if ((context->offset) &&
            msg->parameterOffset != context->checkpoint + context->offset + SELECTOR_SIZE) {
            PRINTF("offset: %d, checkpoint: %d, parameterOffset: %d\n",
                   context->offset,
                   context->checkpoint,
                   msg->parameterOffset);
            return;
        }
        context->offset = 0;
        // To here
        switch (context->selectorIndex) {
            case CALL_BRIDGE_CALL:
                handle_call_bridge_call(msg, context);
                break;
            default:
                PRINTF("Selector Index %d not supported\n", context->selectorIndex);
                msg->result = ETH_PLUGIN_RESULT_ERROR;
                break;
        }
    }
}