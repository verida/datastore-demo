import VeridaApp from 'verida-datastore'

const {
  VUE_APP_DATASTORE_NAME,
  VUE_APP_DATASTORE_URL,
  VUE_APP_DID_URL
} = process.env

const config = {
  appServerUrl: VUE_APP_DATASTORE_URL,
  didServerUrl: VUE_APP_DID_URL,
  userServerUrl: VUE_APP_DATASTORE_URL
}

const chain = 'ethr'

export async function init () {
  const web3Provider = await VeridaApp.WalletHelper.connectWeb3(chain)
  const address = await VeridaApp.WalletHelper.getAddress(chain)
  window.veridaApp = new VeridaApp(VUE_APP_DATASTORE_NAME, chain, address, web3Provider, config)
}

export async function connect () {
  return VeridaApp.WalletHelper.connectWeb3(chain)
}

export async function address () {
  return VeridaApp.WalletHelper.getAddress(chain)
}

export async function bind (auth, unauth) {
  window.ethereum.on('accountsChanged', (accounts) =>
    accounts.length ? auth() : unauth())
}
