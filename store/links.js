export const state = () => ({
  list: [],
})

export const mutations = {
  setLinks: (state, links) => (state.list = links),
}

export const actions = {
  async fetchData({ commit }) {
    try {
      const data = await this.$axios.$get('/links')
      commit('setLinks', data)
    } catch (err) {
      // handle error
    }
  },
  async createLink({ dispatch }, data) {
    const { group, url, link } = data
    try {
      await this.$axios.$post(`/links/${group}`, {
        slug: link,
        url,
      })
      dispatch('fetchData')
      dispatch('groups/fetchData')
    } catch (err) {
      // handle error
    }
  },
}
