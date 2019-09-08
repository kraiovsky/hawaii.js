Helper library to serialize response according to JSON API schema

## How to use
```javascript
// users/src/controllers/v1.js
const { Serializer } = require('@hawaii-js/json-api-serializer')
const userSchema = require('../schemas/generators')

const createUser = () => async ctx => {
  const data = {}
  const user = await Serializer('user', userSchema(''), data)
}
```
