<template>
  <div class="CommentsComponent"></div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'

export default {
  name: 'CommentsComponent',
  props: {
    commentProp: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      posts: computed(() => AppState.posts),
      comments: computed(() => AppState.comments)
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
