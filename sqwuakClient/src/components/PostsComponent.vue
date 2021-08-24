<template>
  <div class="masonry-item">
    <div class="postsComponent card">
      <div class="card-img-top">
        <img class="rounded img-fluid" :src="postProp.img" alt="">
        <h5 class="postName card-title text-light" style="position:absolute;">
          {{ postProp.title }}
        </h5>
        <span v-if="postProp.creator">
          <img class="profPic img-fluid" :src="postProp.creator.picture" alt="">
        </span>
      </div>
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

<style lang="scss" scoped>
.masonry-item{
  display: inline-block;
  margin: 0 0 .5em;
  width: 100%;
}
.card{
  box-shadow: 2px 5px 10px gray;
  border: none;
}
.postsComponent{
position: relative;
border-radius: 5px;
}
.postName{
  position: absolute;
  bottom: 8px;
  left: 10px;
}
.profPic{
   box-shadow: 100px 100px 1000px rgba(0, 0, 0, 0);
  position: absolute;
  border-radius: 50%;
  bottom: 8px;
  right: 16px;
  max-height: 50px;
  max-width: 50px;
}
</style>
