import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  profiles: [],
  posts: [],
  activePost: {},
  profilePosts: [],
  comments: [],
  likes: [],
  shares: [],
  saves: [],
  loading: true,
  loaded: false
})
