export const state = () => ({
  list: [],
  selected: 'all',
})

export const mutations = {
  setGroups(state, list) {
    state.list = list
  },
  selectGroup(state, index) {
    state.selected = index
  },
}

export const actions = {
  async getGroups({ commit }) {
    const res = await this.$axios.$get('groups')
    commit('setGroups', res)
  },
  async addGroup({ dispatch }, data) {
    console.log('add group vuex', data)
    const { name } = data
    const res = await this.$axios.$post('groups', { name })
    dispatch('getGroups')
  },
}
