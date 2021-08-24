<template>
  <router-link :to="{name: 'Archive', params: {id: archiveProp.id}}">
    <div class="archivesComponent card bg-dark">
      <img class="archiveImg card-img-top img-fluid rounded-circle" src="https://cash-connect.com/img/vault-round.jpg" alt="">
      <h4 class="archiveName card-title text-primary" style="position: absolute;">
        {{ archiveProp.name }}
      </h4>
    </div>
  </router-link>
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
.archivesComponent{
position: relative;
border-radius: 10px;
}
.archiveImg{
border-radius: 10px;
}
.archiveName{
  position: absolute;
  bottom: 8px;
  left: 16px;
}
</style>
