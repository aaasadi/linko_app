export const state = () => ({
  list: [],
})

export const mutations = {
  setLinks: (state, links) => (state.list = links),
}

export const actions = {
  async fetchData({ commit }) {
    const data = await this.$axios.$get('/links')
    commit('setLinks', data)
  },
  async createLink({ dispatch }, data) {
    const { group, url, link } = data
    const result = await this.$axios.$post(`/links/${group}`, {
      slug: link,
      url,
    })
    dispatch('fetchData')
    return result
  },
}
