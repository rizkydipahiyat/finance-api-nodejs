## User API Spec

## Register User

Endpoint : POST /api/users
Request Body :

```json
{
  "name": "New User",
  "email": "user@example.com",
  "password": "rahasia"
}
```

Response Body :

````json
{
  "data": {
    "name": "New User",
    "email": "user@example.com",
  }
}

Response Body (Failed) :

```json
{
  "errors": "Name is required, ..."
}
````

## Login User

Endpoint : POST /api/users/login
Request Body :

```json
{
  "email": "user@example.com",
  "password": "rahasia"
}
```

Response Body :

````json
{
  "data": {
    "username": "test",
    "email": "user@example.com",
    "token": "token-sajkdsn1039"
  }
}

Response Body (Failed) :

```json
{
  "errors": "Email or password is wrong"
}
````

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "name": "Eko Aja", // tidak wajib
  "password": "rahasia" // tidak wajib
}
```

Response Body (Success) :

```json
{
  "data": {
    "name": "eko",
    "email": "eko@gmail.com"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User

Endpoint : DELETE /api/users/logout

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": "OK"
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```
