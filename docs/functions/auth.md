---
id: auth
title: Auth
sidebar_label: Auth
---
Authentication service

## API definition
### /auth
#### Login
**`POST /login`**
* **Request**:
  * Payload:
    ```
    {
      "email": "<email>"
    }
    ```
* **Success response**:
  * Status code: `200 or 201`
  * Body:
    ```
    {
      "status": "OK",
      "message": "confirmation token sent"
    }
    ```

**`GET /confirm`**
* **Request**
  * Query
    ```
    token=<UUID4>
    ```
    > token is require
* **Success response**:
  * Status code: `200`
  * Body:
    ```
    {
      "access_token": "<UUIDv4>",
      "token_type": "Bearer",
      "expires_in": 300000,
      "refresh_token": "<UUIDv4>"
    }
    ```

**`POST /refresh`**
* **Request**:
  * Payload:
    ```
    {
      "refresh_token": "<UUIDv4>"
    }
    ```
* **Success response**:
  * Status code: `200`
  * Body:
    ```
    {
      "access_token": "<UUIDv4>",
      "token_type": "Bearer",
      "expires_in": 300000,
      "refresh_token": "<UUIDv4>"
    }
    ```
