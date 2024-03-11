# NodeJS-Auth-RestAPI-ChuckJokes

A secure Node.js repository with user authentication, RESTful endpoints, and a touch of humor – fetching Chuck Norris jokes. Check the README for easy setup and Postman collection for API testing.

## Features

- User authentication with JWT
- RESTful endpoints
- Chuck Norris jokes

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Axios

## Setup

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/user_management
JWT_SECRET=secret
```

4. Run the server

```bash
npm start # or npm run dev
```

5. Import the Postman collection to test the API
