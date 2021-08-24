<template>
  <div class="home flex-grow-1 container-fluid">
    <div class="row mt-5">
      <div class="col">
        <h1>
          {{ state.activeArchive.name }} <i v-if="(state.user.isAuthenticated && state.activeArchive.creatorId === state.account.id)" @click="deleteArchive(state.activeVault.id)" class="fa fa-trash text-danger" aria-hidden="true"></i>
        </h1>
      </div>
    </div>
    <div class="masonry justify-content-around mt-5">
      <keep-component v-for="keep in state.activeVaultKeeps" :key="keep.id" :keep-prop="keep" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { archivesService } from '../services/ArchivesService'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import router from '../router'
import NotificationsService from '../services/NotificationsService'
export default {
  name: 'ArchivePage',
  setup() {
    const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      activeArchive: computed(() => AppState.activeArchive),
      activeArchivePosts: computed(() => AppState.activeArchivePosts)
    })
    async function deleteArchive(archiveId) {
      if (await NotificationsService.confirmAction()) {
        await archivesService.deleteVault(archiveId)
        router.push({ name: 'Profile', params: { id: state.account.id } })
        AppState.activeArchive = {}
        AppState.activeArchiveKeeps = []
      }
    }
    onMounted(() => {
      archivesService.getArchiveById(route.params.id)
      archivesService.getPostsByArchiveId(route.params.id)
    })
    onBeforeRouteLeave(() => {
      AppState.activeArchive = {}
      AppState.activeArchivePosts = []
    })
    return {
      state,
      deleteArchive
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/global.css";
.fa-trash:hover{
  cursor: pointer;
}
</style>
