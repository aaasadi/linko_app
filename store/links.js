export const state = () => ({
  list: [],
})

export const mutations = {
  getLinks: (state, links) => (state.list = links),
}

export const actions = {
  async fetchData({ commit }) {
    const data = await this.$axios.$get('/links')
    commit('getLinks', data)
  },
}
