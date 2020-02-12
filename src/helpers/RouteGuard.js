import store from '@src/store'

const redirect = (to, next) => {
  const permitted = store.getters['did/permitted']

  switch (true) {
    case permitted && to.meta.guest:
      return next({ name: 'home' })
    case !permitted && to.meta.authorized:
      return next({ name: 'connect' })
    default: {
      return next()
    }
  }
}

export const RouteGuard = (to, from, next) => redirect(to, next)
