# Address API Spec

## Create Account

Endpoint : POST api/accounts/:idUser

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "account_name": "Investment",
  "balance": "100000"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "account_name": "Investment",
    "balance": "100000"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "account_name is required"
}
```

## Get Address

Endpoint : GET api/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "country": "Negara",
    "postal_code": "112522"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Address is not found"
}
```

## Update Address

Endpoint : PUT api/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "street": "Jalan",
  "city": "Kota",
  "province": "Provinsi",
  "country": "Negara",
  "postal_code": "112522"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "country": "Negara",
    "postal_code": "112522"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "postal_code is required"
}
```

## Remove Address

Endpoint : DELETE api/contacts/:idContact/addresses/:idAddress

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
  "errors": "address is not found"
}
```

## List Address

Endpoint : GET api/contacts/:idContact/addresses

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan",
      "city": "Kota",
      "province": "Provinsi",
      "country": "Negara",
      "postal_code": "112522"
    },
    {
      "id": 2,
      "street": "Jalan",
      "city": "Kota",
      "province": "Provinsi",
      "country": "Negara",
      "postal_code": "112522"
    }
  ]
}
```

Response Body (Failed) :

```json
{
  "errors": "Contact is not found"
}
```
