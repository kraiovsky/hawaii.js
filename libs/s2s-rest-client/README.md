Service-to-service communication client

 Establishes secure connection between services using basic auth;
 Passes request ID in the header.
 Must take a variable name by which base URL for the target service can be retrieved from the config.

## How to use
```javascript
// auth/src/api/users.js
const restClient = require('@hawaii-js/s2s-rest-client')

const create = async ctx => {
  const {
    request: {
      body: { email },
    },
  } = ctx
  const body = { email }
  const usersApi = await restClient('usersApiUrl')(ctx)
  return await usersApi.post('/v1/users', { body })
}
```
