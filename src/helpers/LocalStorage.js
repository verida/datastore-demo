const { VUE_APP_VERIDA_APP_NAME } = process.env
const sessionKey = `VERIDA_SESSION_${VUE_APP_VERIDA_APP_NAME}did:ethr`

const getSignatureKey = () => {
    return Object.keys(localStorage).find(k => k.includes(sessionKey))
}

export const getSignature = () => {
    const key = getSignatureKey()
    const item = localStorage.getItem(key)
    return Boolean(item)
}

export const resetSignature = () => {
    const key = getSignatureKey()
    localStorage.removeItem(key)
}

