import { getAccounts } from '@src/helpers/VeridaTransmitter'
import { getSignature } from '@src/helpers/LocalStorage'

const redirect = async (to, next) => {
  const accounts = await getAccounts()
  const signature = getSignature()

  switch (true) {
    case accounts.length && signature && to.name !== 'home':
      return next({ name: 'home' })
    case (!signature || !accounts.length) && to.name !== 'connect':
      return next({ name: 'connect' })
    default: {
      return next()
    }
  }
}

export const RouteGuard = (to, from, next) => redirect(to, next)
