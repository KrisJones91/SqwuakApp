<template>
  <div class="archivesComponent">
    <div class="card grid">
      <h4 class="card-title m-4 text-center">
        <small>
          {{ archiveProp.name }}
        </small>
      </h4>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { archivesService } from '../services/ArchivesService'
import { AppState } from '../AppState'
export default {
  name: 'ArchivesComponent',
  props: {
    archiveProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      activeArchive: computed(() => AppState.activeArchive)
    })
    function getArchiveById() {
      archivesService.getArchiveById(props.archiveProp.id)
    }
    return {
      state,
      getArchiveById
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/global.css";
</style>
