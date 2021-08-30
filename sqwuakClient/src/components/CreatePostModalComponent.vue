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
          <div class="modal-header border-primary">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Create a Sqwuak to share with friends!
            </h5>
            <button type="button" class="close text-danger" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <form @submit.prevent="createPost">
                <div class="row justify-content-center m-2">
                  <div class="col-8">
                    <p class="mb-0 mt-0">
                      <b>Title</b>
                    </p>
                    <input type="text" class="form-control" v-model="state.newPost.title" placeholder="Title..." required>
                  </div>
                </div>
                <div class="row justify-content-center m-2">
                  <div class="col-8">
                    <p class="mb-0 mt-1">
                      <b>Description</b>
                    </p>
                    <textarea class="form-control " v-model="state.newPost.description" placeholder="Description..." required>
                  </textarea>
                  </div>
                </div>
                <div class="row justify-content-center m-2">
                  <div class="col-8">
                    <p class="mb-0 mt-1">
                      <b>Photo</b>
                    </p>
                    <input class="form-control mb-3" v-model="state.newPost.img" placeholder="Image URL...">
                  </div>
                </div>
                <div class="row justify-content-center">
                  <button type="submit" class="btn btn-primary">
                    Create
                  </button>
                </div>
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
