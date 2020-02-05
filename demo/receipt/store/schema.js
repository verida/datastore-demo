import { JsonReader } from 'helpers/JsonReader'

const getters = {
  create () {
    return tab => new JsonReader(tab).filter('create')
  },
  grid (state, getters, rootState) {
    return async (tab, id) => {
      const cards = rootState.tabs.cards[tab]
      const reader = new JsonReader(tab)
      const { title, properties } = await reader.filter('grid')

      const resulted = {
        title,
        btn: `New ${title}`,
        headers: [],
        items: []
      }

      if (cards) {
        /*const statistics = new Statistics(cards, properties).grid(tab)
        _.assign(resulted, statistics)*/
      }

      return resulted
    }
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
