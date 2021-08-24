import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  profile: {},
  posts: [],
  activePost: {},
  comments: [],
  activeComment: {},
  archives: [],
  activeArchive: {},
  profArchives: [],
  likes: [],
  shares: [],
  saves: [],
  loading: true,
  loaded: false
})
