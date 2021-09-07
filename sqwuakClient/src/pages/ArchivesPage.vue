<template>
  <div class="ArchivesPage">
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { archivesService } from '../services/ArchivesService'
export default {
  name: 'ArchivesPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      accountArchives: computed(() => AppState.accountArchives),
      activeArchive: computed(() => AppState.activeArchive)

    })
    onMounted(async() => {
      try {
        await archivesService.getPostsByArchiveId(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state, route
    }
  }
}
</script>
