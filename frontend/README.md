# Frontend

## Setting up the environment

View `example.env` for the required .env variables and create a new one with your own defined variables for your environment.

```bash 
BACKEND_URL="http://localhost:3000"
```

## Running with Docker

1. Make sure Docker and Docker Compose are installed on your system.
2. Make sure you have set up the environment variables using the `.env` 
3. Navigate to the project root directory (where the `docker-compose.yml` file is located).
4. Run the following command to build and start the containers:

   ```
   docker-compose up --build
   ```

4. The frontend will be available at `http://localhost:5173`.
5. This step is the same as the backend as docker-compose will spin up the required services.


## Running without Docker

1. Install dependencies:

   ```
   npm install
   ```

2. Start the development server:

   ```
   npm run dev
   ```


## Technologies Used

- React.js + Vite + Typescript
- Tanstack Query + Tanstack Router
- Redux Form
- Material UI