<template>
  <div class="home flex-grow-1 container-fluid">
    <div class="masonry justify-content-around mt-5">
      <PostsComponent v-for="post in state.posts" :key="post.id" :post-prop="post" />
      {{ state.accountArchives }}
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed, onMounted } from '@vue/runtime-core'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import PostsComponent from '../components/PostsComponent.vue'
import { accountService } from '../services/AccountService'
export default {
  components: { PostsComponent },
  name: 'Home',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      accountArchives: computed(() => AppState.accountArchives)
    })
    onMounted(async() => {
      try {
        await postsService.getPosts()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      async getArchives() {
        try {
          await accountService.getArchivesByAccount()
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  // text-align: center;
  // user-select: none;
  // > img{
  //   height: 200px;
  //   width: 200px;
  // }
}
@import "../assets/css/global.css";
</style>
