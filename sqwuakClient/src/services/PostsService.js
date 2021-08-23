import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostsService {
  async getPosts() {
    const res = api.get('api/posts')
    AppState.posts = res.data
  }

  async getPostById(id) {
    const res = await api.get('/api/posts/' + id)
    AppState.activePost = res.data
  }

  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    AppState.posts.push(res.data)
    AppState.profilePosts.push(res.data)
  }

  loading() {
    AppState.loading = true
    AppState.loaded = false
    setTimeout(this.loaded, 6000)
  }

  loaded() {
    AppState.loading = false
    AppState.loaded = true
  }
}
export const postsService = new PostsService()
