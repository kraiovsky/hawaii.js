import forge from 'mappersmith'
import EncodeJson from 'mappersmith/middleware/encode-json'
import config from './config'

const { authApiUrl } = config()

export const Auth = forge({
  clientId: 'auth',
  host: authApiUrl,
  middleware: [EncodeJson],
  resources: {
    MagicLink: {
      send: { method: 'post', path: '/login' },
      confirm: { method: 'get', path: '/confirm' },
    },
    Token: {
      refresh: { method: 'post', path: '/refresh' },
    },
  },
})
