import { getSignature } from '@src/helpers/LocalStorage'

const redirect = async (to, next) => {
  const signature = getSignature()

  switch (true) {
    case signature && to.meta.guest:
      return next({ name: 'home' })
    case !signature && to.meta.authorized:
      return next({ name: 'connect' })
    default: {
      return next()
    }
  }
}

export const RouteGuard = (to, from, next) => redirect(to, next)
