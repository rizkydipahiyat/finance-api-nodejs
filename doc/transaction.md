# Transactions API Spec

## Create Transactions

Endpoint : POST api/accounts/:accountId/user/:userId/transactions

Request Header :

- X-API-TOKEN : test

Request Body :

```json
{
  "transaction_date": "14-04-2024",
  "amount": 100,
  "description": "tabungan tanggal 11",
  "transaction_type": "INCOME",
  "category": "Investment"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "transaction_date": "14-04-2024",
    "amount": 100,
    "description": "tabungan tanggal 11",
    "transaction_type": "INCOME",
    "category": "Investment"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "amount is required"
}
```

## Update Address

Endpoint : PATCH api/accounts/:accountId/user/:userId/transactions/:transactionId

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "transaction_date": "14-04-2024",
  "amount": 100,
  "description": "tabungan tanggal 11",
  "transaction_type": "INCOME",
  "category": "Investment"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "transaction_date": "14-04-2024",
    "amount": 100,
    "description": "tabungan tanggal 11",
    "transaction_type": "INCOME",
    "category": "Investment"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "amount is required"
}
```

## Remove Address

Endpoint : DELETE api/accounts/:accountId/user/:userId/transactions/:transactionId

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
  "errors": "Transaction is not found"
}
```

## List Address

Endpoint : GET api/accounts/:accountId/user/:userId/transactions

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "transaction_date": "14-04-2024",
      "amount": 100,
      "description": "tabungan tanggal 11",
      "transaction_type": "INCOME",
      "category": "Investment"
    },
    {
      "id": 2,
      "transaction_date": "14-04-2024",
      "amount": 10,
      "description": "tabungan tanggal 12",
      "transaction_type": "TRANSFER",
      "category": "Investment"
    }
  ]
}
```

Response Body (Failed) :

```json
{
  "errors": "Account is not found"
}
```
