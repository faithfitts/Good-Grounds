#!/bin/bash

API="https://secret-mesa-20835.herokuapp.com"
URL_PATH="/recipes"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
