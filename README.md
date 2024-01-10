# yaya-webhook
This is a test task project created, to demonstrate the integration of a system with YaYa wallet system using web hooks. It is developed using feathersjs framwork.

# Description
This system tries to implement the required functionalities mentioned on the test document. When a system makes a request to the webhook provided by the system, it takes the payload and verifies the signature. To do this it signs the UTF-8 format of the payload with a predetermined secret key, that is stored as environment variable(default.json). Then it compares it with the signed signature sent as a header from the payment platform. In addition to this it also checks if the request has expired by checking the timestamp sent as payload, and if it passed the predetermined expiry time(usually 5 minutes but set to 2 months for testing purpose). If it passes both this condition, it saves the payment information on a database and without awaiting for the response returns 201. If not it returns an error response with 401 status code. 

# Deployment
Both the database and the backend code are hosted on AWS EC2 instance.

# How to test
To test the functionality, you can use postman desktop application. The payload of the test request is:
```
{
  "id": "1dd2854e-3a79-4548-ae36-97e4a18ebf81",
  "amount": 100,
  "currency": "ETB",
  "created_at_time": 1673381836,
  "timestamp": 1704827531,
  "cause": "Testing",
  "full_name": "Abebe Kebede",
  "account_name": "abebekebede1",
  "invoice_url": "https://yayawallet.com/en/invoice/xxxx"
}
```

And set YAYA-SIGNATURE header to:
```
eyJhbGciOiJIUzI1NiJ9.MWRkMjg1NGUtM2E3OS00NTQ4LWFlMzYtOTdlNGExOGViZjgxMTAwRVRCMTY3MzM4MTgzNjE3MDQ4Mjc1MzFUZXN0aW5nQWJlYmUgS2ViZWRlYWJlYmVrZWJlZGUxaHR0cHM6Ly95YXlhd2FsbGV0LmNvbS9lbi9pbnZvaWNlL3h4eHg.bbAW-dxr3WlUblZrY2AqDABUVIe_STES5YxyzmdVqHo
```

You can manipulate the signature to get different responses.