const { VUE_APP_DATASTORE_NAME } = process.env
const sessionKey = `VERIDA_SESSION_${VUE_APP_DATASTORE_NAME}did:ethr`

export const getSignature = () => {
    const found = Object.keys(localStorage).find(k => k.includes(sessionKey))
    const item = localStorage.getItem(found)
    return Boolean(item)
}

export const getRecipientDid = () => {
    const key = `${sessionKey}recipient-did`
    return localStorage.getItem(key)
}