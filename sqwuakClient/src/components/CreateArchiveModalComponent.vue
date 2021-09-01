<template>
  <div class="CreateArchiveModalComponent">
    <div class="modal fade"
         id="createArchiveModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true"
    >
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
  setup() {
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
