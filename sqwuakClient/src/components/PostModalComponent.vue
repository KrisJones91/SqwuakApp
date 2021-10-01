<template>
  <div class="postModalComponent">
    <div class="modal fade"

         :id="'postModal'+ postProp.id"
         aria-labelledby="postModalLabel"
         aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="container-fluid">
            <div class="row justify-content-center">
              <div class="col d-flex flex-column">
                <div class="row">
                  <div class="col">
                    <div class="modal-header">
                      <button :id="'closeModal'+ postProp.id" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div v-if="postProp.img != null">
                      <img :src="postProp.img" class="img-fluid rounded" alt="">
                    </div>
                    <p class=" mt-2 mb-2 text-center text-primary">
                      <small class="creatorsName">
                        {{ postProp.creator.name }}
                      </small>
                    </p>
                    <hr class="solid border border-primary m-0">
                  </div>
                  <div class="col-12 mt-1 mb-0 text-center" v-if="state.comments">
                    <span>
                      <i class="fa fa-eye text-primary mr-1" aria-hidden="true"></i>
                      {{ postProp.views }}
                      <i class="fa fa-save text-primary ml-2 mr-1" aria-hidden="true"></i>
                      {{ postProp.saves }}
                      <i class="fa fa-share-alt text-primary ml-2 mr-1" aria-hidden="true"></i>
                      {{ postProp.shares }}
                      <i class="fa fa-comments text-primary ml-2 mr-1" aria-hidden="true"></i>
                      {{ state.comments.length }}
                    </span>
                    <hr class="solid border mt-1 border-primary">
                  </div>
                </div>
                <div class="mainBody">
                  <div class="row justify-content-center">
                    <div class="col-11 text-center">
                      <h3 class="modal-title">
                        {{ postProp.title }}
                      </h3>
                      <p class="m-3 modal-desc">
                        <small>"{{ postProp.description }}"</small>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <hr class="solid border border-outline-light mb-0">
                  </div>
                </div>
                <div class="row justify-content-center">
                  <p><small>Archive Options</small></p>
                </div>
                <div class="row mb-1 ml-0 mr-0 justify-content-center">
                  <div class="col-4 mr-2">
                    <div class="dropdown">
                      <button class="btn btn-outline-success dropdown-toggle"
                              type="button"
                              id="addToArchiveDropdown"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="true"
                      >
                        Add to...
                      </button>
                      <div class="dropdown-menu p-2" aria-labelledby="addToArchiveDropdown">
                        <button
                          v-for="archive in state.accountArchs"
                          :key="archive.id"
                          :id="archive.id"
                          @click="addToArchive(archive.id)"
                          class="dropdown-item text-center border border-outline-light bg-light text-dark"
                        >
                          <!-- <hr class="border solid border-outline-light m-0 p-0"> -->
                          <p class="mt-2 mb-2">
                            <b>
                              <small>
                                {{ archive.name }}
                              </small>
                            </b>
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <button v-if="state.user.isAuthenticated && state.activeArchive.creatorId === state.account.id" @click="deleteArchivePost(postProp.archivePostId)" type="button" class="btn btn-outline-danger mx-3">
                      Remove
                    </button>
                  </div>
                  <div class="col-1 p-1 text-center">
                    <i v-if="postProp.creatorId == state.account.id" @click="deletePost" class="fa fa-trash fa-2x text-danger" aria-hidden="true"></i>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col mt-0 ">
                    <hr class="solid border border-outline-light mb-0">
                  </div>
                </div>
                <!-- Comments Section -->
                <p class="text-primary text-center m-2">
                  Comments
                </p>
                <form type="submit">
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text"
                             class="form-control"
                             v-model="state.newComment.body"
                             placeholder="Add a comment..."
                             aria-describedby="attach"
                      >
                      <i class="btn btn-outline-primary fa fa-paper-plane"
                         type="submit"
                         id="attach"
                         @click.prevent="createComment()"
                      ></i>
                    </div>
                  </div>
                </form>
                <div class="sc-box ">
                  <CommentsComponent v-for="comment in state.comments" :key="comment.id" :comment-prop="comment" />
                </div>
                <span class="mt-4"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { accountService } from '../services/AccountService'
import { archivesService } from '../services/ArchivesService'
import $ from 'jquery'
import { router } from '../router'
import CommentsComponent from '../components/CommentsComponent.vue'
import { commentsService } from '../services/CommentsService'
import { postsService } from '../services/PostsService'

export default {
  components: { CommentsComponent },
  name: 'PostModalComponent',
  props: {
    postProp: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      accountArchs: computed(() => AppState.accountArchives),
      activePost: computed(() => AppState.activePost),
      activeArchive: computed(() => AppState.activeArchive),
      comments: computed(() => AppState.comments[props.postProp.id]),
      newComment: { postId: props.postProp.id }
    })
    return {
      state,
      route,
      async addToArchive(archiveId) {
        try {
          await archivesService.AddPostToArch(archiveId, props.postProp.id)
          router.push({ name: 'Archives', params: { id: state.activePost.id } })
          $('#postModal' + props.postProp.id).modal('hide')
        } catch (error) {
          logger.log(error)
        }
      },
      async getArchives() {
        try {
          await accountService.getArchivesByAccount()
        } catch (error) {
          logger.log(error)
        }
      },
      async createComment() {
        try {
          await commentsService.createComment(state.newComment)
          state.newComment = { postId: state.activePost.id }
          // await commentsService.getComments({ id: [props.postProp.id] })
        } catch (error) {
          logger.log(error)
        }
      },
      async deletePost(id) {
        try {
          await postsService.deletePost(props.postProp.id)
          $('#postModal' + props.postProp.id).modal('hide')
          router.push({ name: 'Account', params: { id: state.account.id } })
          // $('.body').removeClass('modal-open')
          // $('.modal-backdrop').remove()
          // await postsService.deletePost(id)
        } catch (error) {
          logger.log(error)
        }
      }

    }
  }
}
</script>

<style>
.sc-box{
overflow-y: auto;
max-height: 400px;
background-color: rgb(255, 255, 255);
border-radius: 10px;
border: solid black 1px;
}
.creatorsName:hover{
  color: red;
}
.mainBody{
  background-image: linear-gradient(180deg, rgb(255, 255, 255), rgb(203, 203, 203));
  padding-top: 20px;
  padding-bottom: 10px;
  border: .25px solid rgb(203, 203, 203);
  box-shadow: 1px 3px 6px gray;
  border-radius: 12px;
  color: black;
}
.modal-title{
font-family: 'Kanit', sans-serif;
text-shadow: 1px 2px 6px rgb(86, 86, 86);
}
.modal-desc{
  color: blue;
  font-family: 'Kanit', sans-serif;
  text-shadow: 1px 2px 5px rgb(86, 86, 86);
}
</style>
