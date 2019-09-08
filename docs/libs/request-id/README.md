---
id: request-id-readme
title: request-id
sidebar_label: Readme
---
Wrapper for generation of request id headers

Based on `koa-req-id` module; gets name for the header from config, if such available.
Must be called after config is set.

## How to use
```javascript
const Koa = require('koa')
const requestId = require('@hawaii-js/request-id')

const app = new Koa()
app.use(requestId())

module.exports = app
```
