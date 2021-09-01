<template>
  <div class="CreateArchiveModalComponent">
    <div class="modal fade"
         id="createArchiveModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header border-primary">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Create a NEW Archive!
            </h5>
            <button type="button" class="close text-danger" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <form @submit.prevent="createArchive">
                <div class="row justify-content-center m-2">
                  <div class="col-8">
                    <p class="mb-0 mt-0">
                      <b>Name your Archive</b>
                    </p>
                    <input type="text" class="form-control" v-model="state.newArchive.Name" placeholder="..." required>
                  </div>
                </div>
                <div class="form-check text-center">
                  <p class="mb-0">
                    <input class="mb-0" type="checkbox" v-model="state.newArchive.isPrivate">
                    Private?
                  </p>
                  <p class="mt-0">
                    <small>
                      Private archives can only be seen by you
                    </small>
                  </p>
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
import { archivesService } from '../services/ArchivesService'
import { logger } from '../utils/Logger'
import $ from 'jquery'

export default {
  name: 'CreateArchiveModalComponent',
  props: {
    newArchiveProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      newArchive: {}
    })
    return {
      state,
      async createArchive() {
        try {
          await archivesService.createArchive(state.newArchive)
          state.newArchive = {}
          $('#createArchiveModal').modal('hide')
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
