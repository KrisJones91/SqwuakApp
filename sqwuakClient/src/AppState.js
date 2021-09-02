import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  profile: {},
  posts: [],
  activePost: {},
  accountPosts: [],
  comments: {},
  activeComment: {},
  archives: [],
  activeArchive: {},
  profArchives: [],
  accountArchives: [],
  likes: [],
  shares: [],
  saves: [],
  loading: true,
  loaded: false
})
