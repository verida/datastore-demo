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
      case '/schemas/inbox/type/dataSend':
        return acceptOptions;
        case '/schemas/inbox/type/dataRequest':
          return acceptOptions;
      default:
        return []
    }
  }

  /**
     * Perform the requested action on an inbox entry
     *
     * @param {*} inboxEntry
     * @param {*} action
     */
  async handleAction (inboxEntry, action) {
    let inbox = await this._app.inbox.getInbox();

    if (inboxEntry.data.status) {
      throw new Error('Data has already been ' + inboxEntry.data.status)
    }

    // update the inboxEntry status
    inboxEntry.data.status = action
    inboxEntry.read = true
    await inbox.save(inboxEntry)

    switch (inboxEntry.type) {
      case '/schemas/inbox/type/dataSend':
        // save the data
        if (action === 'accept') {
          let dataSend = inboxEntry.data.data
          for (let i in dataSend) {
            const dataEntry = dataSend[i]
            const store = await this._app.openDatastore(dataEntry.schema)
            await store.save(dataEntry)
          }
        }
        break;
      case '/schemas/inbox/type/dataRequest/schema.json':
        if (action === 'accept') {
          let dataRequest = inboxEntry.data
          let vid = inboxEntry.sentBy.vid
          let did = inboxEntry.sentBy.did
          let response = {
            "_id": inboxEntry._id
          };

          // TODO: Show a modal popup asking user to select data
          // that matches the given schema with (optional) filter
          // applied
          //let dataResponse = askUserForData(dataRequest);

          // TODO: update `response` with inbox reply and send
          // to specfic VID
          //window.veridaApp.outbox.send();
        }
        break
      default:
        console.error('Unknown inbox type: ' + inboxEntry.type)
    }
  }
}

export default InboxManager
