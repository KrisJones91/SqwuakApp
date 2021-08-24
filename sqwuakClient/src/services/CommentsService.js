import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentsService {
  async getComments(postId) {
    const res = await api.get('api/posts/' + postId + '/comments')
    AppState.comments[postId] = res.data
  }
}
export const commentsService = new CommentsService()
