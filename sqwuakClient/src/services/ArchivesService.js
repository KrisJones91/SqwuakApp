import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ArchivesService {
  async getArchiveById(id) {
    const res = await api.get('api/archives/' + id)
    AppState.activeArchive = res.data
  }

  async getPostsByArchiveId(id) {
    const res = await api.get('api/archives/' + id + '/posts')
    AppState.posts = res.data
  }

  async createArchive(archive) {
    const res = await api.post('api/archives', archive)
    AppState.archives.push(res.data)
    AppState.accountArchives.push(res.data)
  }

  async AddPostToArch(archiveId, postId) {
    const newAp = { archiveId: archiveId, postId: postId }
    const res = await api.post('api/archivesposts', newAp)
    logger.log(res)
    logger.log(newAp)
    // router.push({ name: 'Archives', params: { id: archiveId } })
  }

  // still working on this
  async editArchive(id, editedArch) {
    const res = await api.put('api/archives/' + id, editedArch)
    const myIndex = AppState.myArchives.indexOf(archive => archive.id === id)
    AppState.myArchives = AppState.myArchives.splice(myIndex, 1, res.data)
    const profIndex = AppState.profileArchives.indexOf(archive => archive.id === id)
    AppState.profileArchives = AppState.profileArchives.splice(profIndex, 1, res.data)
  }

  async deleteArchive(id) {
    await api.delete('api/archives/' + id)
    AppState.myArchives = AppState.myArchives.filter(archive => !(archive.id === id))
  }
}
export const archivesService = new ArchivesService()
