Helper library to generate responses object according to JSON API schema

## How to use
```javascript
// users/src/schemas/generators.js
const schema = require('@hawaii-js/json-api-schema-generator')

module.exports = whitelistedFields => {
  const blacklistedFields = ['createdAt', 'deletedAt', 'updatedAt']
  const links = {
    self: data => `/users/${data.id}`,
  }
  const topLevelLinks = {
    index: '/users',
  }
  const relationships = {}
  return schema(whitelistedFields, blacklistedFields, links, topLevelLinks, relationships)
}
```
