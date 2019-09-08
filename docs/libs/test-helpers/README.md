---
id: test-helpers-readme
title: test-helpers
sidebar_label: Readme
---
Collection of test helpers

## Available helpers
### DB queries mocks
* `mockFindByKey(table, key, value)`
* `mockFirstRecord(table)`

## How to use
```javascript
// libs/json-api-serializer/__tests__/json-api-serializer.spec.js
const {
  dbQueries: { mockFirstRecord },
} = require('@hawaii-js/test-helpers')
const mockUsersDB = require('../../../functions/users/__fixtures__/users')

const mockUserProfile = mockFirstRecord(mockUsersDB)
...
```
