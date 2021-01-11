#!/bin/sh

API="https://secret-mesa-20835.herokuapp.com"
URL_PATH="/recipes/all"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
