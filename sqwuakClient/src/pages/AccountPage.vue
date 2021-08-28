<template>
  <div class="account container-fluid">
    <div class="row">
      <div class="col text-center">
        <h1>{{ state.account.name.split('@')[0] }}'s Sqwuaks</h1>
        <img class="rounded" :src="state.account.picture" alt="" />
        <p>{{ state.account.email }}</p>
      </div>
    </div>
    <div class="row">
      <ArchivesComponent v-for="archive in state.accountArchives" :key="archive.id" :archive-prop="archive" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'
import ArchivesComponent from '../components/ArchivesComponent.vue'

export default {
  components: { ArchivesComponent },
  name: 'Account',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      accountPosts: computed(() => AppState.accountPosts),
      accountArchives: computed(() => AppState.accountArchives),
      activeArchive: computed(() => AppState.activeArchive)
    })
    onMounted(async() => {
      try {
        await accountService.getArchivesByAccount()
        await accountService.getPostsByAccount()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      route

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
