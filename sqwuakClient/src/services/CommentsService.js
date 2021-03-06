import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CommentsService {
  async getComments(postId) {
    const res = await api.get('api/posts/' + postId + '/comments')
    AppState.comments[postId] = res.data
  }

  async createComment(comment) {
    const res = await api.post('api/comments', comment)
    logger.log(res.data)
    AppState.comments[comment.postId].push(res.data)
  }
}
export const commentsService = new CommentsService()
