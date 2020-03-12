import VeridaApp from '@verida/datastore'
import { getSignature } from '@src/helpers/LocalStorage'
import ProfileManager from './ProfileManager'
import InboxManager from './InboxManager'

const {
  VUE_APP_DATASTORE_ENVIRONMENT,
  VUE_APP_TITLE
} = process.env

const config = {
  environment: VUE_APP_DATASTORE_ENVIRONMENT,
}

let callbacks = {}

/**
 * Connect the user to their Verida Datastore Application
 *
 * @param {boolean} force True if the connection should be forced (open a Metamask dialog to login to their app)
 * @param {function} canceled if sign up is cancelled by user
 */
export async function connectVerida (force, canceled = () => {}) {
  const web3Provider = await VeridaApp.WalletHelper.connectWeb3('ethr')
  const address = await VeridaApp.WalletHelper.getAddress('ethr')

  if (!window.veridaApp) {
    window.veridaApp = new VeridaApp(VUE_APP_TITLE, 'ethr', address, web3Provider, config)
    window.inboxManager = new InboxManager(window.veridaApp)
  }

  window.profileManager = new ProfileManager(window.veridaApp)
  await window.profileManager.init()

  try {
    let connected = await window.veridaApp.connect(force);
    if (connected) {
      callbacks.auth()
    }
  } catch (e) {
    canceled()
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

export function bindInbox (cb) {
  if (window.veridaApp) {
    window.veridaApp.inbox.on('newMessage', cb)
  }
}

export async function fetchInbox (filter = {}) {
  if (!window.veridaApp) {
    return []
  }
  const inbox = await window.veridaApp.inbox.getInbox()
  return inbox.getMany(filter)
}
