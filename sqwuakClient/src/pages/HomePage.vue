<template>
  <div class="home container-fluid">
    <div class="grid mt-5">
      <PostsComponent v-for="post in state.allPosts" :key="post.id" :post-prop="post" />
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
// import { accountService } from '../services/AccountService'

export default {
  components: { PostsComponent },
  name: 'Home',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      allPosts: computed(() => AppState.allPosts),
      accountArchives: computed(() => AppState.accountArchives)
    })
    onMounted(async() => {
      try {
        await postsService.getPosts()
        // await accountService.getArchivesByAccount()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state

    }
  }
}
</script>

<style scoped lang="scss">

@import "../assets/css/global.css";
</style>
