# Todo Management WebApp

Todo Management WebApp is a full-stack application that allows users to manage their tasks efficiently. Users can create, update, delete, and view their todos. The application uses Recoil for state management, Tailwind CSS for styling, and connects to a backend API for data persistence.

## Features

-   [x] User Authentication
-   [x] Add New Todos
-   [ ] Edit Existing Todos
-   [x] Delete Todos
-   [x] Mark Todos as Completed
-   [ ] Responsive Design
-   [x] User-friendly UI
-   [ ] Priority Levels
-   [ ] Due Dates and Reminders
-   [ ] Categories and Tags
-   [ ] Attachments
        and many more to be added...

## Tech Stack

**Client:** React, Recoil, Tailwind CSS, Axios, React Icons, React Toastify

**Server:** Node.js, Express, MongoDB, JWT for authentication, Cookies for session management

## Installation

1. Clone the repository:

```bash
    git clone https://github.com/hustlerZzZ/todo-fullstack.git
    cd todo-fullstack
```

2.Install frontend dependencies:

```
    cd frontend
    npm i
```

3.Install backend dependencies:

```
    cd backend
    npm i
```

## Configuration

Set up environment variables:

```
    PORT=5555
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
```

## Running the application

1. Start the backend server:

```
    cd backend
    node index.js
```

2. Start the frontend:

```
    cd frontend
    npm run dev
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any features, fixes, or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
