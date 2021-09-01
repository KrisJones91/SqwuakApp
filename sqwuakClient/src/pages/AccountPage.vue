<template>
  <div class="account container-fluid">
    <div class="row justify-content-start py-3">
      <div class="col-6 text-center" v-if="state.account.name != null">
        <h3>
          {{ state.account.name.split('@')[0] }}'s Sqwuaks
        </h3>
        <img class="rounded" style="width:50px; height:50px;" :src="state.account.picture" alt="" />
        <p>{{ state.account.email }}</p>
      </div>
      <!-- Create Buttons -->
      <div class="col-6 mt-4">
        <div class="row justify-content-center">
          <button class="btn btn-outline-primary m-2" data-toggle="modal" data-target="#createPostModal">
            New Post
          </button>
        </div>
        <div class="row justify-content-center">
          <button class="btn btn-outline-primary m-2" data-toggle="modal" data-target="#createArchiveModal">
            New Archive
          </button>
        </div>
      </div>
    </div>

    <!-- create modals -->
    <CreatePostModalComponent />
    <CreateArchiveModalComponent />

    <hr class=" border-primary">
    <div class="row justify-content-center">
      <ArchivesComponent v-for="archive in state.accountArchives" :key="archive.id" :archive-prop="archive" />
    </div>
    <hr class=" border-primary">
    <!-- <h4>{{ state.account.name.split('@')[0] }}'s Posts</h4><hr class=" border-primary"> -->
    <div class="grid row-jusitfy-content-center">
      <PostsComponent v-for="post in state.accountPosts" :key="post.id" :post-prop="post" />
    </div>
    <div class="mb-3"></div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'
import ArchivesComponent from '../components/ArchivesComponent.vue'
import PostsComponent from '../components/PostsComponent.vue'
import { commentsService } from '../services/CommentsService'

export default {
  components: { ArchivesComponent, PostsComponent },
  name: 'Account',
  props: {
    postProp: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      accountPosts: computed(() => AppState.accountPosts),
      accountArchives: computed(() => AppState.accountArchives),
      activeArchive: computed(() => AppState.activeArchive),
      comments: computed(() => AppState.comments[props.postProp.id])
    })
    onMounted(async() => {
      try {
        await commentsService.getComments(props.postProp.id)
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

<style scoped lang="scss">
img {
  max-width: 100px;
}
@import "../assets/css/global.css";
</style>
