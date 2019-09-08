Users management service

## API definition
### /v1/users
#### Create user
**`POST /`**
* Request:
  * Payload:
    ```
    {
      "email": "<email>"
    }
    ```
* Success response:
  * Status code: `200 or 201`
  * Body:
    ```
    {
      "jsonapi": { "version": "1.0" },
      "links": { "index": "/users" },
      "data": {
        "type": "user",
        "id": "<UUIDv4>",
        "attributes": { "role": "<role>", "email": "<email>" },
        "links": { "self": "/users/<UUIDv4>" }
      }
    }
    ```

#### Find user 
**`GET /:searchQuery`**
* **Request**:
  * URL Params:
    ```
    searchQuery=[UUIDv4 or email schema]
    ```
  * Query:
    ```
    searchKey=[id|email]
    fields[users]=[email,role,name]
    ```
    > `searchKey` is optional and defaults to `id` if not provided

    > `fields` is optional

* **Success response**:
  * Status code: `200 or 201`
  * Body:
    ```
    {
      "jsonapi": { "version": "1.0" },
      "links": { "index": "/users" },
      "data": {
        "type": "user",
        "id": "<UUIDv4>",
        "attributes": { "role": "<role>", "email": "<email>" },
        "links": { "self": "/users/<UUIDv4>" }
      }
    }
    ```
