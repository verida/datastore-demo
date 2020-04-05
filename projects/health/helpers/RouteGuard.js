import { RouteGuard } from '@src/helpers/RouteGuard'

import store from '@/store/patient'

const BASIC = '/note/create'
const redirect = async (to, from, next) => {
  const { did } = store.state.patient
  if (!did && to.name === 'entity' && to.params.mode !== 'create') {
    next(BASIC)
  } else {
    RouteGuard(to, from, next)
  }
}

export const LocalRouteGuard = (to, from, next) => redirect(to, from, next)
