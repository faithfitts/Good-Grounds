#!/bin/bash

API="https://secret-mesa-20835.herokuapp.com"
URL_PATH="/sign-out"

curl "${API}${URL_PATH}/" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
