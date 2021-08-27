<template>
  <div class="ArchivesPage">
    <h1>This is the Archives page</h1>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'ArchivesPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts)

    })
    onMounted(async() => {

    })
    return {
      state, route
    }
  }
}
</script>
