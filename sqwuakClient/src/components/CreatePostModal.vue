<template>
  <div class="modal fade"
       id="createPostModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="createPostModal"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createPostModal">
            Create a Post
          </h5>
          <button id="createPostCloseModal" type="button" class="close text-danger" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>

    <div class="modal-body">
      <form @submit.prevent="createPost">
        <div class="form-group">
          <input type="text"
                 name="Title"
                 id="title"
                 class="form-control"
                 placeholder="Title..."
                 v-model="state.newPost.title"
          >
          <input type="text"
                 name="Description"
                 id="description"
                 class="form-control"
                 placeholder="What are you thinking about?..."
                 v-model="state.newPost.description"
          >
          <input type="text"
                 name="Img"
                 id="Img"
                 class="form-control"
                 placeholder="Paste Image URL here..."
                 v-model="state.newPost.img"
          >
        </div>
        <button type="submit" class="btn btn-success">
          Create
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'

export default {
  name: 'CreatePostModal',
  setup() {
    const state = reactive({
      newPost: {}
    })
    return {
      state,
      async createPost() {
        try {
          await postsService.createPost(state.newPost)
          state.newPost = {}
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style>

</style>
