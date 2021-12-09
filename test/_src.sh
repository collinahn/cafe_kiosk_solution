#!/bin/bash

echo "request no."$1
curl -X 'POST' \
  'http://192.168.123.198:5000/order/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  --data '{
  "order": {
    "item1": 1,
    "item11": 1
  }
}'