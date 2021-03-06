import { AppState } from '../AppState'
import { accountService } from './AccountService'
import { api } from './AxiosService'

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    AppState.allPosts = res.data
    AppState.posts = res.data
  }

  async getPostById(id) {
    const res = await api.get('/api/posts/' + id)
    AppState.activePost = res.data
    this.getPosts()
  }

  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    AppState.posts.push(res.data)
    await accountService.getPostsByAccount()
  }

  async deletePost(id) {
    await api.delete('api/posts/' + id)
    AppState.posts = AppState.posts.filter(k => k.id !== id)
    // const postIndex = AppState.posts.findIndex(p => p.id === id)
    // AppState.posts.splice(postIndex, 1)
    await accountService.getPostsByAccount()
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
