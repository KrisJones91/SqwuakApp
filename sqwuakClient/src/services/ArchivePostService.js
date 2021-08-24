import { AppState } from '../AppState'
import { archivesService } from './ArchivesService'
import { api } from './AxiosService'

class ArchivePostService {
  async createArchivePost(archivePost) {
    const res = await api.post('api/archivesposts', archivePost)
    archivesService.getPostsByArchiveId(res.data.archiveId)
  }

  async deleteArchivePost(id) {
    await api.delete('api/archivesposts/' + id)
    AppState.activeArchivePosts = AppState.activeArchivePosts.filter(post => !(post.archivePostId === id))
  }
}
export const archivePostService = new ArchivePostService()
