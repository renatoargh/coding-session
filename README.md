# Coding Session

## Instructions

Clone the repo and run the following commands

``` 
# Starting the API
cd ./api
npm install
npm start

# Starting the UI
cd ../ui
npm install
npm run dev
```

Then go the `http://localhost:3000` on your browser

![UI Example](./ui-example.jpeg)

## API Operations Summary

1. GET /api/items
   - Retrieves all items.

2. POST /api/items
   - Adds a new item.
   - Request Body: { "name": "string", "description": "string" }

3. DELETE /api/items/:id
   - Deletes an item by its ID.

Errors:
- 400: Invalid payload or missing ID.
- 404: Item not found.
