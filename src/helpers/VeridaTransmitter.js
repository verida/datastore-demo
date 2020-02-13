import VeridaApp from 'verida-datastore'
import { getSignature } from '@src/helpers/LocalStorage'

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

let callbacks = {}

/**
 * Connect the user to their Verida Datastore Application
 *
 * @param {boolean} force True if the connection should be forced (open a Metamask dialog to login to their app)
 */
export async function connectVerida (force) {
  const web3Provider = await VeridaApp.WalletHelper.connectWeb3('ethr')
  const address = await VeridaApp.WalletHelper.getAddress('ethr')

  if (!window.veridaApp) {
    window.veridaApp = new VeridaApp(VUE_APP_DATASTORE_NAME, 'ethr', address, web3Provider, config)
    window.veridaApp.inbox.on("newMessage", function(message) {
      console.log("verida wallet detected new message", message);
    });
  }

  let connected = await window.veridaApp.connect(force);
  if (connected) {
    callbacks.auth()
  }
}

export async function getAddress () {
  return VeridaApp.WalletHelper.getAddress('ethr')
}

/**
 * Bind callbacks to fire when the user is authenticated / deauthenticated
 *
 * @param {*} auth Callback to fire when the user is authenticated
 * @param {*} unauth Callback to fire when the user is unauthenticated
 */
export async function bind (auth, unauth = () => {}) {
  callbacks.auth = auth
  callbacks.unauth = unauth

  window.ethereum.on('accountsChanged', (accounts) => {
    if (!accounts.length) {
      return unauth()
    }
    if (accounts.length && getSignature()) {
      return auth()
    }
  })
}

export async function getAccounts () {
  return new Promise((resolve, reject) => {
    const handler = (err, accounts) => err ? reject(err) : resolve(accounts)
    window.web3.eth.getAccounts(handler)
  });
}

export async function logout () {
  if (window.veridaApp) {
    window.veridaApp.disconnect()
    window.veridaApp = null
  }
}