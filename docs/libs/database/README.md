---
id: database-readme
title: database
sidebar_label: Readme
---
Database factory

## How to use
```javascript
// <model>.js
const Model = require('@hawaii-js/database')
const dbConfig = require('../../config/database')()
const modelSchema = {
  ...
}

const modelOptions = {
  ...
}

module.exports = () => {
  const tableName = 'tableName'
  return Model(tableName, modelSchema, modelOptions, dbConfig)
}
```
