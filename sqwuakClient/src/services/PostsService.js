import { AppState } from '../AppState'
import { accountService } from './AccountService'
import { api } from './AxiosService'

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
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
    const postInd = AppState.posts.findIndex(p => p._id === id)
    AppState.posts.splice(postInd, 1)
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
