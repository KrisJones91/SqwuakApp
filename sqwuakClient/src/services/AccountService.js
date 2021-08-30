import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
// import { postsService } from './PostsService'

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
      logger.log(`'You have ${AppState.accountPosts.length} post(s)'`)
    } catch (error) {
      logger.log(error)
    }
  }

  async getArchivesByAccount() {
    const res = await api.get('api/account/archives')
    logger.log(AppState.accountArchives)
    logger.log(`'You have ${AppState.accountArchives.length} archive(s)'`)
    AppState.accountArchives = res.data
  }
}

export const accountService = new AccountService()
