const { VUE_APP_DATASTORE_NAME } = process.env
const sessionKey = `VERIDA_SESSION_${VUE_APP_DATASTORE_NAME}`

const getAuthorizedDid = () => {
    const key = `${sessionKey}did:ethr`
    const found = Object.keys(localStorage).find(k => k.includes(key))
    return localStorage.getItem(found)
}

const getRecipientDid = () => {
    const key = `${sessionKey}recipient-did`
    return localStorage.getItem(key)
}

export default {
    authorized: getAuthorizedDid(),
    recipient: getRecipientDid()
}