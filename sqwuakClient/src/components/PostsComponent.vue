<template>
  <div class="postsComponent" data-toggle="modal" :data-target="'#postModal' + postProp.id">
    <div class="card" @click="getPostById()">
      <img class="rounded img-fluid" :src="postProp.img" alt="">
      <h5 class="postName card-title text-light" style="position:absolute;">
        {{ postProp.title }}
      </h5>
      <span v-if="postProp.creator">
        <img class="profPic img-fluid" :src="postProp.creator.picture" alt="">
      </span>
    </div>
    <PostModalComponent :post-prop="postProp" />
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import PostModalComponent from './PostModalComponent.vue'

export default {
  components: { PostModalComponent },
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
      comments: computed(() => AppState.comments[props.postProp.id]),
      activePost: computed(() => AppState.activePost)
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
      async getPostById() {
        try {
          await postsService.getPostById(props.postProp.id)
        } catch (error) {
          logger.log(error)
        }
      },
      async deletePost() {
        try {
          await postsService.deletePost(props.postProp.id)
        } catch (error) {
          logger.log(error)
        }
      },
      convertUpdate(updatedAt) {
        // const dateYear = updatedAt.slice(0, 4)
        // const dateMonth = updatedAt.slice(5, 7)
        // const dateDay = updatedAt.slice(8, 10)
        // return dateMonth + '/' + dateDay + '/' + dateYear
        console.log(updatedAt)
        const time = updatedAt.split('T')[0]
        return time
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.card{
  box-shadow: 2px 5px 8px gray;
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
  text-shadow: 1px 2px 5px black;
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

@media (max-width: 700px) {

}
</style>
