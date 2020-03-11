import { DATA_SEND, DATA_REQUEST } from '@src/constants/inbox'

class InboxManager {
  constructor (app) {
    this._app = app
  }

  /**
   * Given an inbox entry it will return an array of actions that can be
   * performed on the inbox entry. This is for display purposes.
   *
   * @param {*} inboxEntry
   */
  getActions (inboxEntry) {
    let acceptOptions = [
      {
        'name': 'accept',
        'label': 'Accept'
      },
      {
        'name': 'reject',
        'label': 'Reject'
      }
    ]

    switch (inboxEntry.type) {
      case DATA_SEND:
      case DATA_REQUEST:
        return acceptOptions
      default:
        return []
    }
  }

  /**
   * Perform the requested action on an inbox entry
   *
   * @param {*} inboxEntry
   * @param {*} action
   * @param payload
   */
  async handleAction (inboxEntry, action, payload = []) {
    let inbox = await this._app.inbox.getInbox()

    if (inboxEntry.data.status) {
      throw new Error('Data has already been ' + inboxEntry.data.status)
    }

    // update the inboxEntry status
    inboxEntry.data.status = action
    inboxEntry.read = true
    await inbox.save(inboxEntry)

    switch (inboxEntry.type) {
      case DATA_SEND:
        // save the data
        if (action === 'accept') {
          let dataSend = inboxEntry.data.data
          for (let i in dataSend) {
            const dataEntry = dataSend[i]
            const store = await this._app.openDatastore(dataEntry.schema)
            await store.save(dataEntry)
          }
        }
        break
      case DATA_REQUEST:
        // This is a request for a group of data (ie: All my health notes)
        if (action === 'accept') {
          let dataRequest = inboxEntry.data
          let did = inboxEntry.sentBy.did
          let appName = inboxEntry.sentBy.app

          const store = await this._app.openDatastore(dataRequest.requestSchema)
          const response = {
            data: null,
            replyId: inboxEntry._id
          }

          if (dataRequest.userSelect) {
            response.data = payload
          } else {
            let foundData = await store.getMany(dataRequest.filter ? dataRequest.filter : {})
            response.data = [ foundData ]
          }

          const [type, msg] = [ DATA_SEND, 'Send you the requested data' ]
          await this._app.outbox.send(did, type, response, msg, {
            appName: appName
          })
        }
        break
      default:
        console.error('Unknown inbox type: ' + inboxEntry.type)
    }
  }
}

export default InboxManager
