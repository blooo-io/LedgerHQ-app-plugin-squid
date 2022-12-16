#include "squid_plugin.h"

void handle_query_contract_id(void *parameters) {
    ethQueryContractID_t *msg = (ethQueryContractID_t *) parameters;
    squid_parameters_t *context = (squid_parameters_t *) msg->pluginContext;

    strlcpy(msg->name, PLUGIN_NAME, msg->nameLength);

    switch (context->selectorIndex) {
        case CALL_BRIDGE_CALL:
            strlcpy(msg->version, "Call Bridge Call", msg->versionLength);
            break;
        case BRIDGE_CALL:
            strlcpy(msg->version, "Bridge Call", msg->versionLength);
            break;
        case CALL_BRIDGE:
            strlcpy(msg->version, "Call Bridge", msg->versionLength);
            break;
        default:
            PRINTF("Selector Index :%d not supported\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    msg->result = ETH_PLUGIN_RESULT_OK;
}