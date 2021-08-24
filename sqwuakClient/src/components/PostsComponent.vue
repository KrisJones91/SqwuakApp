<template>
  <div class="posts-component justify-content-around">
    <div class="card">
      <p>{{ postProp }}</p>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'

export default {
  name: 'PostsComponent',
  props: {
    postProp: { type: Object, required: true }
  },
  setup(props) {
    // const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      posts: computed(() => AppState.posts),
      // looks into own individual array
      comments: computed(() => AppState.comments[props.postProp.id])
    })
    onMounted(async() => {
      try {
        // await commentsService.getComments(props.postProp._id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state,
      async deletePost() {
        try {
          await postsService.deletePost(props.postProp.id)
        } catch (error) {
          logger.log(error)
        }
      },
      convertUpdate(updatedAt) {
        const dateYear = updatedAt.slice(0, 4)
        const dateMonth = updatedAt.slice(5, 7)
        const dateDay = updatedAt.slice(8, 10)
        return dateMonth + '/' + dateDay + '/' + dateYear
      }
    }
  }
}
</script>

<style>

</style>
