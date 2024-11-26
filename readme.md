```markdown
# JWT Authentication with Access and Refresh Tokens

This is a Node.js project implementing **JWT (JSON Web Tokens)** authentication using both **access tokens** and **refresh tokens** with a proper **MVC architecture**. The project provides secure user authentication and handles edge cases like token expiration, unauthorized access, and token revocation.

## Features

- **User Registration**: Allows users to create an account.
- **Login**: Users can log in with email and password, receiving an access token and refresh token.
- **Refresh Token Mechanism**: Access tokens are short-lived, and refresh tokens can be used to get a new access token without requiring the user to log in again.
- **Secure Refresh Token Storage**: Refresh tokens are stored as **HTTP-only cookies** to enhance security and prevent XSS attacks.
- **Token Expiration**: Both access and refresh tokens have expiration times, and expired tokens can be refreshed using valid refresh tokens.
- **Token Revocation**: Refresh tokens are stored in the database, allowing manual revocation.

## Project Structure

```
project/
├── controllers/
│   └── authController.js           # Authentication logic
├── middlewares/
│   └── authMiddleware.js           # Token validation middleware
├── models/
│   └── userModel.js               # User model schema
│   └── tokenModel.js              # Token model schema (for storing refresh tokens)
├── routes/
│   └── authRoutes.js              # Authentication routes
├── utils/
│   └── jwtUtils.js                # JWT utility functions (token generation, validation)
├── config/
│   └── db.js                      # Database connection setup
├── app.js                          # Express app configuration
├── server.js                       # Server setup and start
├── package.json                   # Project dependencies and scripts
├── .env                           # Environment variables (e.g., secrets, database URI)
```

## Requirements

- **Node.js** (v14+ recommended)
- **MongoDB** (for database storage)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/jwt-authentication.git
cd jwt-authentication
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the project and configure the following variables:

```plaintext
PORT=3000
DB_URI=mongodb://localhost:27017/jwt-auth
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_LIFETIME=15m
REFRESH_TOKEN_LIFETIME=7d
```

### 4. Start the Server

Ensure MongoDB is running on your system, then start the application:

```bash
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### `POST /api/auth/register`
- **Description**: Register a new user with email and password.
- **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
- **Response**:
    ```json
    {
        "message": "User registered successfully"
    }
    ```

### `POST /api/auth/login`
- **Description**: Log in with email and password to receive an access token and refresh token.
- **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
- **Response**:
    ```json
    {
        "accessToken": "your_access_token"
    }
    ```
- The refresh token is stored in an HTTP-only cookie.

### `POST /api/auth/refresh-token`
- **Description**: Refresh the access token using the refresh token.
- **Request**: Send the refresh token as an HTTP-only cookie.
- **Response**:
    ```json
    {
        "accessToken": "new_access_token"
    }
    ```

### `POST /api/auth/logout`
- **Description**: Log out by deleting the refresh token and clearing the cookie.
- **Request**: None
- **Response**:
    ```json
    {
        "message": "Logged out successfully"
    }
    ```

## Security Considerations

- **JWTs**: Access tokens are short-lived (15 minutes) to minimize the risk of misuse. Refresh tokens last longer (7 days).
- **Secure Cookies**: Refresh tokens are stored in secure, HTTP-only cookies to protect against XSS attacks.
- **Token Revocation**: Refresh tokens are stored in the database, enabling revocation if needed.

## Postman Collection

To make it easier to test the API, a **Postman collection** with all the API endpoints has been provided. You can import this collection into Postman to quickly test the registration, login, token refresh, and logout functionalities.

- [Download the Postman Collection](./postman_collection/JWT_Authentication_Collection.json)

## Troubleshooting

- Ensure MongoDB is running locally or configure your database URI in `.env`.
- Verify your `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` are securely set in the `.env` file.
- If the server is not starting, check the logs for error details.

## Future Improvements

- **Password Reset**: Implement password reset functionality with token-based email verification.
- **Rate Limiting**: Add rate-limiting to the authentication routes to prevent brute force attacks.
- **Email Verification**: Add email verification step during registration.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

### Changes Made:
- **Postman Collection**: Added a section explaining that a Postman collection has been provided, with a link to download it for testing the APIs.
  
This version of the `README.md` makes it clear that the Postman collection is included to help users quickly test the API.
