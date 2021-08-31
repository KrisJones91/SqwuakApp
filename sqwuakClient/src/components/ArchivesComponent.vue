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
.card{
  box-shadow: 2px 5px 12px rgb(153, 152, 152);
  // background-image: url('https://www.myfreetextures.com/wp-content/uploads/2011/06/brushedsteel5.jpg');
  // background-position-y: 10%;
  // background-position-x: 20%;
  // border: 1px solid gray;
  background-image: linear-gradient(60deg, rgb(200, 200, 200),rgb(255, 255, 255), rgb(200, 200, 200));
  margin: 2px;
}
@import "../assets/css/global.css";
</style>
