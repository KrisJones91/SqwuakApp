import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('api/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getPostsByAccount() {
    try {
      const res = await api.get('api/account/posts')
      AppState.accountPosts = res.data
      logger.log(AppState.accountPosts.length)
    } catch (error) {
      logger.log(error)
    }
  }

  async getArchivesByAccount() {
    try {
      const res = await api.get('api/account/archives')
      AppState.accountArchives = res.data
      logger.log(AppState.accountArchives.length)
    } catch (error) {
      logger.log(error)
    }
  }
}

export const accountService = new AccountService()
