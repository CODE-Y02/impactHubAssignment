# Game Lobby & Wallet

This project is a web application featuring a game lobby, a wallet system, and the ability to join games. It is built with a React frontend and an Express backend.

## Project Structure

The repository is organized into two main directories:

-   `/app`: Contains the React frontend application, built with Vite.
-   `/server`: Contains the Express.js backend server.

## Getting Started

To run this project locally, you will need to have Node.js and npm installed. Follow these steps to get both the frontend and backend services running.

### Backend Setup

1.  **Navigate to the server directory:**

    ```bash
    cd server
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the server:**

    ```bash
    npm start
    ```

    The backend server will start on `http://localhost:3001`.

### Frontend Setup

1.  **Navigate to the app directory:**

    ```bash
    cd app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create an environment file:**

    Create a `.env` file in the `/app` directory and add the following line to connect the frontend to your local backend:

    ```
    VITE_API_BASE_URL=http://localhost:3001
    ```

4.  **Run the frontend:**

    ```bash
    npm run dev
    ```

    The frontend development server will start on `http://localhost:5173`.

## How to Use

-   **Game Lobby**: Browse available games.
-   **Wallet**: View your balance and transaction history.
-   **Join Game**: Click the "Play" button on a game to join. If your balance is insufficient, you will be prompted to recharge.
