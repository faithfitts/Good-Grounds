#!/bin/bash

API="https://secret-mesa-20835.herokuapp.com"
URL_PATH="/recipes"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "recipe": {
      "title": "'"${TITLE}"'",
      "description": "'"${DESCRIPTION}"'",
      "method": "'"${METHOD}"'",
      "ingredients": "'"${INGREDIENTS}"'"
    }
  }'

echo
