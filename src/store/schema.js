import { JsonReader } from '@src/helpers/JsonReader'

const getters = {
  create () {
    return tab => new JsonReader(tab).filter('create')
  },
  fields () {
    return tab => new JsonReader(tab).filter('view')
  },
  collections () {
    return (tab, single = false) => {
      const map = require(`@/config/map.json`)
      return (map.folders[tab] && map.folders[tab].schemas) || (single ? tab : [tab])
    }
  }
}

export default {
  namespaced: true,
  getters
}
