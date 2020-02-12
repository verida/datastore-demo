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
  return await VeridaApp.WalletHelper.getAddress('ethr')
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

  window.ethereum.on('accountsChanged', async (accounts) => {
   accounts.length ? null : callbacks.unauth()
  })
}

export async function logout () {
  window.veridaApp.disconnect()
  window.veridaApp = null

  const key1 = `VERIDA_SESSION_${VUE_APP_DATASTORE_NAME}recipient-did`
  localStorage.removeItem(key1)

  const key2 = `VERIDA_SESSION_${VUE_APP_DATASTORE_NAME}did`
  localStorage.removeItem(key2)
}

export function isConnected () {
  const address = Object.keys(localStorage).find(key => key.includes(`VERIDA_SESSION_${VUE_APP_DATASTORE_NAME}did`))
  return localStorage.getItem(address)
}

export function setRecipient (did) {
  const key = `VERIDA_SESSION_${VUE_APP_DATASTORE_NAME}recipient-did`
  return localStorage.setItem(key, did)
}

export function getRecipient () {
  const key = `VERIDA_SESSION_${VUE_APP_DATASTORE_NAME}recipient-did`
  return localStorage.getItem(key)
}

export function setAddress (callback) {
  const key = `VERIDA_SESSION_${VUE_APP_DATASTORE_NAME}did`
  const init = (err, accounts) => {
    if (accounts.length) {
      localStorage.setItem(key, accounts[0])
    }
    callback()
  }
  window.web3.eth.getAccounts(init)
}