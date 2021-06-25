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
    try {
      const list = await this.$axios.$get('groups')
      commit('setGroups', list)
    } catch (err) {
      console.log(err)
      // handle error
    }
  },
  async addGroup({ dispatch }, data) {
    const { name } = data
    try {
      await this.$axios.$post('groups', { name })
      dispatch('getGroups')
    } catch (err) {
      // handle err
    }
  },
  async deleteGroup({ dispatch }, name) {
    try {
      await this.$axios.$delete(`groups/${name}`)
      dispatch('getGroups')
    } catch (err) {
      // handle err
    }
  },
}
