<template>
  <div class="archivesComponent">
    <div class="card">
      <h4 class="card-title m-4">
        {{ archiveProp.name }}
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

</style>
