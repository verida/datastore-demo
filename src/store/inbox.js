import { fetchInbox } from '@src/helpers/VeridaTransmitter'

import Inbox1 from ''

const state = {
  amount: null,
  messages: []
}

const mutations = {
  setInboxAmount (state, payload) {
    state.amount = payload
  },
  setInboxMessages (state, payload) {
    state.messages = payload
  }
}

const getters = {
  cards: (state) => state.messages
    .slice()
    .sort((msg1, msg2) => {
      const date1 = moment(msg1.sentAt)
      const date2 = moment(msg2.sentAt)
      return date2.diff(date1)
    })
    .map(msg => {
      return {
        did: msg.sentBy.did,
        img: Inbox1,
        title: msg.message,
        text: ' from MyLocalDoctor',
        raw: JSON.parse(JSON.stringify(msg)),
        status: msg.data.status,
        updated: moment(msg.sentAt).fromNow(),
        user: state.messages.user
      }
    })
}

const actions = {
  async getInboxAmount ({ commit }) {
    const entries = await fetchInbox({ read: false })
    commit('setInboxAmount', entries.length)
  },
  async getInboxMessages ({ commit }) {
    const entries = await fetchInbox()
    commit('setInboxMessages', entries)
  },
  async getInboxSender ({ commit }, did) {
    const profile = await window.veridaApp.openProfile(did)
    return profile.getMany()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
