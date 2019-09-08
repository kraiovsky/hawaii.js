Collection of validation schemas

> See `/schemas` for available schemas.

## How to use
```javascript
// routes/auth.js
const Router = require('koa-joi-router')
const {
  LOGIN_REQ_BODY,
  RES_AUTH_HEADERS_VALIDATION,
  RES_ERROR_VALIDATION,
} = require('@hawaii-js/validation-schemas')

const auth = new Router()

auth.route({
  method: 'post',
  path: '/login',
  validate: {
    body: LOGIN_REQ_BODY,
    type: 'json',
    output: {
      '200, 201': {
        body: LOGIN_RES_BODY,
      },
      '400-599': {
        body: RES_ERROR_VALIDATION,
      },
    },
  },
  ...
})
```
