export class JsonReader {
  constructor (tab) {
    this.tab = tab
  }

  async schema () {
    const schema = await window.veridaApp.getSchema(this.tab)
    return schema.getSpecification()
  }

  async filter (property) {
    const action = require(`@/config/layouts.json`)[this.tab][property]
    const { title, properties, color, required } = await this.schema()

    let icon = null
    try {
      icon = require.resolve(`@schemas/${this.tab}/icon.svg`)
    } catch (e) {
      console.log(e)
    }

    const fields = _.chain(properties)
        .pick(action)
        .mapObject((item, key) =>  {
          return {...item, required: required.includes(key)}
        }).value()

    return {
      title,
      color,
      icon,
      properties: fields
    }
  }

  folders () {
    const entity = require(`@/config/map.json`).folders[this.tab]
    return entity ? entity.folders : null
  }

  static sidebar () {
    const map = require(`@/config/map.json`)
    return map.navigation.map(folder => {
      const { label, icon } = map.folders[folder]
      return {
        label,
        folder,
        icon: require('!html-loader!@/config/' + icon)
      }
    })
  }

  static mode (tab) {
    const map = require(`@/config/map.json`)
    return map.folders[tab] ? map.folders[tab].display : null
  }

  static folders (list, primary) {
    return list.map(async (key) => {
      const card = await new this(key).filter('card')
      const [tab, statistics] = key.split('/')
      return Object.assign(card, {
        navigation: {
          name: 'grid',
          params: { tab, statistics }
        }
      })
    })
  }
}
