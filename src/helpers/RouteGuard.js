import { getAccounts } from '@src/helpers/VeridaTransmitter'
import { getSignature } from '@src/helpers/LocalStorage'

const redirect = async (to, next) => {
  const accounts = await getAccounts()
  const signature = getSignature()
  const { guest, authorized } = to.meta

  switch (true) {
    case accounts && signature && guest:
      return next({ name: 'home' })
    case accounts && !signature && authorized:
      return next({ name: 'connect' })
    default: {
      return next()
    }
  }
}

export const RouteGuard = (to, from, next) => redirect(to, next)
