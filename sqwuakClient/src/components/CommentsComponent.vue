<template>
  <div class="CommentsComponent">
    <p>{{ state.comments }}</p>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { commentsService } from '../services/CommentsService'

export default {
  name: 'CommentsComponent',
  props: {
    commentProp: { type: Object, required: true }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      posts: computed(() => AppState.posts),
      activePost: computed(() => AppState.activePost),
      comments: computed(() => AppState.comments[route.params.id])
    })
    onMounted(async() => {
      try {
        await commentsService.getComments(route.params.id)
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

<style>

</style>
