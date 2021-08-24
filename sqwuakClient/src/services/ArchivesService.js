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
}
export const archivesService = new ArchivesService()
