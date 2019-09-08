---
id: auth-client-readme
title: auth-client
sidebar_label: Readme
---
Collection of auth middlewares

## Available middlewares
> See inline JSDocs for more details.

### Authenticate
Sets user object with authenticated user's details and proceeds to the next handler or throws 401.

Sets user object with authenticated user's details and proceeds to the next handler or throws 403.

### SignTransportReq
Sets service access token and proceeds to the next handler.


## How to use
```javascript
// routes/v1.js
const Router = require('koa-joi-router')
const { Authenticate, Authorize } = require('@hawaii-js/auth-client')

const users = new Router()

users.route({
  method: 'post',
  path: '/',
  handler: [Authenticate(), Authorize(['auth']), createUser()],
})
```
