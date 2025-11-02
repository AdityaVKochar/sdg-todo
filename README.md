# Simple Todo App

A full-stack todo application built with Next.js and Express + MongoDB.

## Features

- ✅ Create new tasks
- ✅ View all tasks on the landing page
- ✅ Click on a task to view details
- ✅ Update existing tasks
- ✅ Delete tasks

## Task Properties

Each task has the following properties:
- `id`: Unique identifier (MongoDB ObjectId)
- `title`: Task title
- `content`: Task description/content
- `createdAt`: Timestamp when the task was created
- `dueAt`: Due date for the task

## Tech Stack

### Backend
- Express.js
- MongoDB with Mongoose
- CORS enabled

### Frontend
- Next.js 16
- React 19
- Tailwind CSS
- Client-side rendering for interactivity

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v18 or higher)
- MongoDB (running locally on port 27017)

## Installation & Setup

### 1. Install MongoDB

If you don't have MongoDB installed locally, download and install it from [mongodb.com](https://www.mongodb.com/try/download/community).

After installation, start MongoDB:
```bash
# On Windows
mongod

# On macOS/Linux
sudo systemctl start mongod
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd sdg-todo-fe

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Click the "Create Task" button to add a new task
3. Fill in the task details (title, content, and due date)
4. Click on any task card to view its details
5. In the task detail page, you can:
   - Edit the task by clicking "Edit Task"
   - Delete the task by clicking "Delete Task"

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Project Structure

```
SDG-TODO/
├── backend/
│   ├── index.js          # Express server and API routes
│   ├── package.json
│   └── node_modules/
├── sdg-todo-fe/
│   ├── src/
│   │   └── app/
│   │       ├── page.js           # Landing page with task list
│   │       ├── task/
│   │       │   └── [id]/
│   │       │       └── page.js   # Task detail page
│   │       ├── layout.js
│   │       └── globals.css
│   ├── package.json
│   └── node_modules/
```

## Development Notes

- The backend uses MongoDB's default connection (`mongodb://localhost:27017/todoapp`)
- CORS is enabled to allow frontend-backend communication
- The frontend uses Next.js App Router with client components
- Tailwind CSS is configured for styling

## Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running on your system
- Check that MongoDB is accessible on `localhost:27017`

**CORS Error:**
- Ensure the backend server is running on port 5000
- Check that CORS is properly configured in `backend/index.js`

**Port Already in Use:**
- Backend: Change the PORT in `backend/index.js`
- Frontend: Next.js will automatically suggest a different port

## Future Enhancements

Possible improvements:
- Add task status (completed/pending)
- Implement task categories or tags
- Add search and filter functionality
- User authentication
- Task priority levels
- Responsive mobile design improvements
