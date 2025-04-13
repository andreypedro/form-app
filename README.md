# Form App

## Description

Form App is a web application for creating, managing, and submitting forms. It includes a frontend built with React and a backend powered by Fastify. The application allows users to create custom forms, view form submissions, and manage form data efficiently.

## Installation

### Prerequisites

- Docker and Docker Compose installed on your machine.

### Steps

1. Build the Docker containers:

   ```bash
   docker compose build
   ```

2. Start the application:

   ```bash
   docker compose up
   ```

3. Run migrations and seed the database (only required the first time):
   ```bash
   cd backend
   npm run migrate
   npm run seed
   ```

The application will be available at `http://localhost:3000`.

## Features

- Create custom forms with various field types (text, textarea and date).
- View and manage form submissions.
- Validate required fields before submission.

## Project Structure

```
form-app/
├── backend/          # Fastify backend with API routes
├── frontend/         # React frontend with form builder and viewer
├── docker-compose.yml
└── README.md
```

## API Endpoints

### Forms

- `GET /form`: Retrieve all forms.
- `GET /form/:id`: Retrieve a specific form by ID.
- `POST /form`: Create a new form.
- `POST /form/:id/submit`: Submit answers for a form.

## Running Tests (TODO)

To run the tests for the frontend:

```bash
cd frontend
npm test
```

To run the tests for the backend:

```bash
cd backend
npm test
```

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Fastify, Prisma
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **Testing**: Jest, React Testing Library

## Contributing

Contributions are welcome!

## License

This project is licensed under the MIT License.
