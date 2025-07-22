<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">Auth Starter Kit</h1>
  <p align="center">
    A ready-to-use user authentication system with Node.js, Express, MongoDB, and React + TypeScript.
    <br />
    <a href="#about-the-project"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/kiwiscode/auth-starter-kit/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/kiwiscode/auth-starter-kit/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#authentication-flows">Authentication Flows</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

Auth Starter Kit is a complete authentication project using JWT cookie-based authentication, with backend APIs built on Node.js, Express, and MongoDB, and a frontend using React and TypeScript.

It supports:

- User registration & login (email/full name + password)
- Email verification
- JWT refresh tokens
- Forgot password & reset password via token
- Password change functionality
- Profile management
- Logout
- Google OAuth2 social login
- Email notifications via Resend Email service

This starter kit helps developers quickly add secure authentication to their fullstack applications without starting from scratch.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Resend Email](https://resend.com/)
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Make sure you have the following installed:

- Node.js (v20 or higher recommended)
- npm or yarn
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)
- Resend Email API key
- Google OAuth credentials

### Installation

1. Clone the repo:

   ```sh
   git clone https://github.com/your_username/auth-starter-kit.git
   cd auth-starter-kit
   ```

2. Setup server:

   ```sh
   cd server
   npm install
   ```

3. Setup client:

   ```sh
   cd ../client
   npm install
   ```

4. Configure environment variables:

- Server

  ```js
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Database
   MONGO_URI=your_mongodb_connection_string

   # JWT Secrets
   JWT_ACCESS_SECRET=your_access_token_secret
   JWT_REFRESH_SECRET=your_refresh_token_secret

   # Frontend URL
   FRONTEND_URL=http://localhost:5173

   # Email Service
   EMAIL_SENDER=your_email_address@example.com
   RESEND_API_KEY=your_resend_api_key

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
  ```

- Client

  ```js
  // API Base URL (Vite uses VITE_ prefix)
  VITE_API_URL=http://localhost:3000
  ```

5. Run backend server:

   ```sh
   cd ../server
   node server.js
   ```

6. Run frontend app:

   ```sh
    cd ../client
    npm run dev
   ```

Your app should now be running locally.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

You can register new users, log in, verify emails, reset forgotten passwords, change passwords, manage profile data, and authenticate via Google OAuth using the frontend UI or the backend API.

The backend exposes the following main endpoints:

### Health Check Route

| Endpoint      | Description                                                |
| ------------- | ---------------------------------------------------------- |
| `GET /health` | Returns basic status of the server => `{ "status": "ok" }` |

### Authentication Routes

_All authentication routes are prefixed with /api/auth. Below is the list of available routes and their descriptions:_

| Endpoint                      | Description                   |
| ----------------------------- | ----------------------------- |
| `POST /register`              | User registration             |
| `POST /login`                 | Login with email & password   |
| `POST /refresh-token`         | Refresh JWT access token      |
| `POST /forgot-password`       | Request password reset email  |
| `POST /reset-password/:token` | Reset password with token     |
| `GET  /verify-email/:token`   | Email verification with token |
| `POST /logout`                | Logout user                   |
| `POST /change-password`       | Change user password          |
| `GET  /profile`               | Get user profile              |
| `POST /auth/google`           | Google OAuth login            |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Authentication Flows

### Register & Email Verification

- User submits registration form
- Backend creates user with isVerified: false
- Verification email with token sent via Resend
- User clicks verification link
- Backend verifies token and updates user isVerified status
- Not: User can log in even if email is not verified

### Login & Refresh Tokens

- User logs in with email and password
- JWT access and refresh tokens are generated
- Tokens are stored securely in HTTP-only cookies; localStorage is not used
- Access token is sent with requests to protected endpoints
- Refresh token endpoint issues new access tokens when needed

### Forgot & Reset Password

- User requests password reset by submitting email
- Password reset email with token is sent
- User visits link and submits new password

### Change Password

- Logged-in user can change password by providing current and new password

### Google Authentication

- User clicks Google login on frontend
- OAuth flow returns Google user info
- Backend logs in existing user or creates new account if needed

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [x] User registration and login
- [x] Email verification
- [x] JWT refresh token implementation
- [x] Forgot/reset password flow
- [x] Google OAuth integration
- [ ] Apple Sign-In integration
- [ ] Facebook Login integration
- [ ] Add unit/integration tests (backend & frontend)
- [ ] Add Docker setup for backend/frontend
- [ ] More detailed API docs (Swagger/OpenAPI)

See the [open issues](https://github.com/kiwiscode/auth-starter-kit/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

This project is licensed under the MIT License.
See the [LICENSE](https://github.com/kiwiscode/auth-starter-kit/blob/main/LICENSE) file for details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Aykut Kav - [@kiwisc0de](https://twitter.com/kiwisc0de) - ayktkav@gmail.com

Project Link: [https://github.com/kiwiscode/auth-starter-kit](https://github.com/kiwiscode/auth-starter-kit)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
