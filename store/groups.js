export const state = () => ({
  list: [],
  selected: 0,
})

export const mutations = {
  getGroups(state, list) {
    state.list = list
  },
  selectGroup(state, index) {
    state.selected = index
  },
}

export const actions = {
  async fetchData({ commit }) {
    const data = await this.$axios.$get('groups')
    commit('getGroups', data)
  },
}
