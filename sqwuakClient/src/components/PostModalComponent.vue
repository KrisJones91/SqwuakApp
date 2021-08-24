<template>
  <div class="postModalComponent">
    <div class="modal fade" :id="'postModal'+postProp.id" tabindex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="container-fluid">
            <div class="row justify-content-center">
              <div class="col d-flex flex-column">
                <div class="row">
                  <div class="col">
                    <div class="modal-header">
                      <button :id="'closeModal'+ postProp.id" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <img :src="postProp.img" class="img-fluid rounded" alt="">
                    <hr class="solid border border-light">
                  </div>
                  <div class="col-12 mb-3 text-center">
                    <span>
                      <i class="fa fa-eye text-primary ml-2 mr-1" aria-hidden="true"></i>
                      {{ postProp.views }}
                      <i class="fa fa-save text-primary ml-2 mr-1" aria-hidden="true"></i>
                      {{ postProp.saves }}
                      <i class="fa fa-share-alt text-primary ml-2 mr-1" aria-hidden="true"></i>
                      {{ postProp.shares }}
                    </span>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col text-center">
                    <div class="modal-body">
                      <h3 class="modal-title" :id="'postModal'+ postProp.id +'Label'">
                        {{ postProp.title }}
                      </h3>
                      <p><small>{{ postProp.description }}</small></p>
                    </div>
                    <hr class="solid border border-light mb-2">
                  </div>
                </div>
                <div class="row my-2 justify-content-center">
                  <div class="col-4">
                    <div class="dropdown">
                      <button class="btn btn-outline-success dropdown-toggle"
                              type="button"
                              id="addToArchiveDropdown"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                      >
                        Archives
                      </button>
                      <div class="dropdown-menu" aria-labelledby="addToArchiveDropdown">
                        <button v-for="archive in state.myArchives"
                                :key="archive.id"
                                :archive-prop="archive"
                                class="dropdown-item"
                                type="button"
                                @click="createArchivePost(state.activePost.id, archive.id)"
                        >
                          {{ archive.name }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <button v-if="state.user.isAuthenticated && state.activeArchive.creatorId === state.account.id" @click="deleteArchivePost(postProp.archivePostId)" type="button" class="btn btn-outline-danger mx-3">
                      Remove from Archive
                    </button>
                  </div>
                  <div class="col-1 p-1">
                    <i v-if="postProp.creatorId == state.account.id" @click="deletePost(postProp.id)" class="fa fa-trash fa-2x text-danger" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { archivePostService } from '../services/ArchivePostService.js'
import { archivesService } from '../services/ArchivesService'
import { logger } from '../utils/Logger'

export default {
  name: 'PostModalComponent',
  props: {
    postProp: { type: Object, required: true },
    archiveProp: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      myArchives: computed(() => AppState.myArchives),
      activePost: computed(() => AppState.activePost),
      activeArchive: computed(() => AppState.activeArchive)
    })
    async function createArchivePost(postId, archiveId) {
      const newArchivePost = { postId: postId, archiveId: archiveId }
      await archivePostService.createArchivePost(newArchivePost)
    }
    onMounted(async() => {
      try {
        await archivesService.getArchiveById(props.archiveProp.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      route,
      createArchivePost
    }
  }
}
</script>

<style>

</style>
