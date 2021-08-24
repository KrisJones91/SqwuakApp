import { AppState } from '../AppState'
import { api } from './AxiosService'

class ArchivesService {
  async getAllArchives() {
    const res = await api.get('api/archives')
    AppState.archives = res.data
  }

  async getArchiveById(id) {
    const res = await api.get('api/archives/' + id)
    AppState.activeArchive = res.data
  }

  async getPostsByArchiveId(id) {
    const res = await api.get('api/archives/' + id + '/posts')
    AppState.activeArchivePosts = res.data
  }

  async createArchive(archive) {
    const res = await api.post('api/archives', archive)
    AppState.myArchives.push(res.data)
    AppState.profileArchives.push(res.data)
  }

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
