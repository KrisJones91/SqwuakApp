<template>
  <div class="CommentsComponent">
    <div class="card mb-1">
      <div class="row p-0 m-0" v-if="commentProp.creator">
        <div class="col-3">
          <img :src="commentProp.creator.picture" class="img-fluid creatorPic" alt="">
        </div>
        <div class="col-9 mb-0 pb-0">
          <p class="creatorName">
            <small>{{ commentProp.creator.name }}</small>
          </p>
        </div>
      </div>
      <hr class="border solid border-outline-dark m-2 p-0">
      <div class="card-bottom">
        <div class="col ml-2 mr-0 pr-3">
          <p><small>{{ commentProp.body }}</small></p>
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
// import { commentsService } from '../services/CommentsService'

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
        // await commentsService.getComments(route.params.id)
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
  max-width: 30px;
  position: relative;
  top: 5px;
  left: -8px;
  margin-bottom: 1px;
}
.creatorName{
  position: relative;
  top: 6px;
  left: -30px;
  margin-bottom: 0;
}
</style>
