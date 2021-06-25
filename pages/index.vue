<template>
  <div>
    <add-link />
    <add-group />
    <groups />
    <links />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AddLink from '~/components/addLink.vue'
import AddGroup from '~/components/addGroup.vue'
import Groups from '~/components/groups.vue'
import Links from '~/components/links.vue'

export default {
  components: { AddLink, AddGroup, Groups, Links },
  head: {
    title: 'Dashboard page',
  },
  methods: {
    ...mapActions({
      fetchGroupsData: 'groups/getGroups',
      fetchLinksData: 'links/fetchData',
    }),
  },
  async fetch() {
    await this.fetchGroupsData()
    await this.fetchLinksData()
  },
}
</script>
