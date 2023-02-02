# Badges
[![Code style check](https://github.com/blooo-io/LedgerHQ-app-plugin-squid/actions/workflows/lint-workflow.yml/badge.svg?branch=main)](https://github.com/blooo-io/LedgerHQ-app-plugin-squid/actions/workflows/lint-workflow.yml)
[![Compilation & tests](https://github.com/blooo-io/LedgerHQ-app-plugin-squid/actions/workflows/ci-workflow.yml/badge.svg?branch=main)](https://github.com/blooo-io/LedgerHQ-app-plugin-squid/actions/workflows/ci-workflow.yml)

# Ledger squid Plugin

This is a plugin for the Ethereum application which helps parsing and displaying relevant information when signing a squid transaction.

## Prerequisite

Clone the plugin in a new folder.

```shell
git clone https://github.com/blooo-io/LedgerHQ-app-plugin-squid.git
```

Then in the same folder clone two more repositories, which is the plugin-tools and app-ethereum.

```shell
git clone https://github.com/LedgerHQ/plugin-tools.git                          #plugin-tools
git clone --recurse-submodules https://github.com/LedgerHQ/app-ethereum.git     #app-ethereum
```
## Documentation

Need more information about the interface, the architecture, or general stuff about ethereum plugins? You can find more about them in the [ethereum-app documentation](https://github.com/LedgerHQ/app-ethereum/blob/master/doc/ethapp_plugins.asc).

## Smart Contracts

The smart contracts covered by this plugin are:

| Network   | Smart Contract |
| ---       | ---            |
| Ethereum  | `0xce16F69375520ab01377ce7B88f5BA8C48F8D666`|
| Ethereum  | `0x4f4495243837681061c4743b74b3eedf548d56a5`|
| Polygon   | `0xce16F69375520ab01377ce7B88f5BA8C48F8D666`|
| Polygon   | `0x6f015f16de9fc8791b234ef68d486d2bf203fba8`|
| BSC       | `0xce16F69375520ab01377ce7B88f5BA8C48F8D666`|
| BSC       | `0x304acf330bbe08d1e512eefaa92f6a57871fd895`|


On these smart contracts, the functions covered by this plugin are:

|    Function   | Selector  | Displayed Parameters |
| ---           | ---       | --- |
|callBridgeCall | 0x8ca3bf68| <table>  <tbody>  <tr> <td><code>address token</code></td></tr> <tr><td><code>uint256 amount</code></td></tr> <tr><td><code>string destinationChain</code></td></tr> <tr><td><code>string bridgedTokenSymbol</code></td></tr> </tbody> </table> |
|bridgeCall     | 0x3c659741| <table>  <tbody>  <tr><td><code>string destinationChain</code></td></tr> <tr><td><code>string bridgedTokenSymbol</code></td></tr> <tr><td><code>uint256 amount</code></td></tr> </tbody> </table>|
|callBridge     | 0xf35af1f8| <table>  <tbody>  <tr> <td><code>address token</code></td></tr> <tr><td><code>uint256 amount</code></td></tr> <tr><td><code>string destinationChain</code></td></tr> <tr><td><code>string bridgedTokenSymbol</code></td></tr> </tbody> </table> |
|sendToken     | 0x26ef699d| <table>  <tbody>  <tr> <td><code>string destinationChain</code></td></tr> <tr><td><code>string destinationAddress</code></td></tr> <tr><td><code>string symbol</code></td></tr> <tr><td><code>uint256 amount</code></td></tr> </tbody> </table> |

## Build

Go to the plugin-tools folder and run the "./start" script.
```shell
cd plugin-tools  # go to plugin folder
./start.sh       # run the script start.sh
```
The script will build a docker image and attach a console.
When the docker image is running go to the "LedgerHQ-app-plugin-squid" folder and build the ".elf" files.
```shell
cd LedgerHQ-app-plugin-squid/tests    # go to the tests folder in app-plugin-squid
./build_local_test_elfs.sh            # run the script build_local_test_elfs.sh
```

## Tests

To test the plugin go to the tests folder from the "app-plugin-squid" and run the script "test"
```shell
cd LedgerHQ-app-plugin-squid/tests    # go to the tests folder in LedgerHQ-app-plugin-squid
yarn test                             # run the script test
```
## Continuous Integration


The flow processed in [GitHub Actions](https://github.com/features/actions) is the following:

- Code formatting with [clang-format](http://clang.llvm.org/docs/ClangFormat.html)
- Compilation of the application for Ledger Nano S, Nano S+ and Nano X in [ledger-app-builder](https://github.com/LedgerHQ/ledger-app-builder)
- Execution of the provided end to end tests