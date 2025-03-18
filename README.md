# URL Shortener

## Features

- Shorten long URLs
- Retrieve original URLs
- Update & delete short URLs
- Track URL usage statistics

## Tech Stack

- MongoDB (Atlas)
- Express.js
- React.js
- Node.js

## API Endpoints

- `POST /api/shorten` - Create short URL
- `GET /api/:shortCode` - Retrieve original URL
- `PUT /api/shorten/:shortCode` - Update short URL
- `DELETE /api/shorten/:shortCode` - Delete short URL
- `GET /api/shorten/:shortCode/stats` - Get statistics

## How to Run Locally

```bash
git clone https://github.com/yourusername/yourname-innovaxel-lastname.git
cd server
npm install
npm start
cd ../client
npm install
npm start
```
