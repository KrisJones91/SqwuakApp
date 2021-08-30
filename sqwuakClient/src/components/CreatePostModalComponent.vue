<template>
  <div class="CreatePostModalComponent">
    <div class="modal fade"
         id="createPostModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              NEW Post
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <form @submit.prevent="createPost">
                <div class="row justify-content-center m-2">
                  <p><b>Title</b></p>
                  <input type="text" class="form-control" v-model="state.newPost.name" placeholder="Title..." required>
                </div>
                <div class="row justify-content-center m-2">
                  <p><b>Image URL</b></p>
                  <input class="form-control" v-model="state.newPost.img" placeholder="URL..." required>
                </div>
                <div class="row justify-content-center m-2">
                  <p><b>Description</b></p>
                  <textarea class="form-control " v-model="state.newPost.description" placeholder="Description..." required>
                  </textarea>
                </div>
                <button type="submit" class="btn btn-warning">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import $ from 'jquery'

export default {
  name: 'CreatePostModalComponent',
  props: {
    newPostProp: { type: Object, required: true }
  },
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
          $('#createPostModal').modal('hide')
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
