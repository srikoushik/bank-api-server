# bank-api-server
A simple node application which provides API's to get bank details using PostgreSQL.

Node application is running on https://bank-api-server.herokuapp.com/

For using cURL in web - https://reqbin.com/curl

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/bca5736f9092dae63d1f)

# cURL commands:

1. API to generate token ``curl https://bank-api-server.herokuapp.com/auth/generate``

2. API to get bank details with IFSC ``curl -H "token: <token>" https://bank-api-server.herokuapp.com/api/bankDetails/ANDB0002601``

3. API to get bank details with bankName and city ``curl -H "token: <token>" https://bank-api-server.herokuapp.com/api/bankDetails?bankName=andhra%20bank&city=chennai&limit=5&offset=1``

NOTE:

- 3rd API supports pagination.
- Generate token and replace in the cURL for 2nd and 3rd API.
- Here are some of the available city and bank names
    - ALLAHABAD BANK, ANDHRA BANK, BANK OF BARODA, THE ANDHRA PRADESH STATE COOPERATIVE BANK LIMITED
    - CHENNAI, MUMBAI, PUNE

## What I would do in further iterations:

- Fuzzy match on the bank name.
