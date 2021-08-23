import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostsService {
  async getPosts() {
    const res = api.get('api/posts')
    AppState.posts = res.data
  }

  async createPost(post) {
    const res = await api.post('api/posts', post)
    AppState.posts.push(res.data)
  }
}
export const postsService = new PostsService()
