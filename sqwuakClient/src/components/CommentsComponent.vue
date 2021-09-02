<template>
  <div class="CommentsComponent">
    <div class="card">
      <div class="row">
        <div class="col-4">
          <img :src="state.comments[0].creator.picture" class="img-fluid creatorPic" alt="">
        </div>
        <div class="col-8 text-start">
          <p><small>{{ state.comments[0].creator.name }}</small></p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p><small>{{ state.comments[0] }}</small></p>
        </div>
      </div>
    </div>
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
      comments: computed(() => AppState.comments[AppState.activePost.id])
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

<style scoped>
.card{
  position: relative;
}
.creatorPic{
  border-radius: 50%;
  max-width: 40%;
  max-height: 40%;
  position: relative;
  top: 5px;
}
</style>
