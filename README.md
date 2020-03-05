# bank-api-server
A simple node application which provides API's to get bank details using PostgreSQL.

Node application is running on https://bank-api-server.herokuapp.com/

For using cURL in web - https://reqbin.com/curl

# cURL commands:

1. API to generate token ``curl https://bank-api-server.herokuapp.com/auth/generate``

2. API to get bank details with IFSC ``curl -H "token: <token>" https://bank-api-server.herokuapp.com/api/bankDetails/ifsc?ifsc=ANDB0002601``

3. API to get bank details with bankName and city ``curl -H "token: <token>" https://bank-api-server.herokuapp.com/api/bankDetails/nameAndCity?bankName=andhra%20bank&city=chennai&limit=20&offset=0``

NOTE:

- 3rd API supports pagination.
- Generate token and replace in the cURL for 2nd and 3rd API.
