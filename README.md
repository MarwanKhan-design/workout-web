# Next.js + API Routes Todo App

A simple todo application built with Next.js using API routes as the backend, demonstrating how Next.js API routes can work like Express.js endpoints.

## Features

- ✅ Create todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript support
- ✅ RESTful API routes

## API Endpoints

The app includes the following API routes that work like Express endpoints:

- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create a new todo
- `GET /api/todos/[id]` - Get a specific todo
- `PUT /api/todos/[id]` - Update a specific todo
- `DELETE /api/todos/[id]` - Delete a specific todo

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes (instead of separate Express server)
- **Database:** MongoDB with Mongoose ODM

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your MongoDB connection:
   - Copy the `.env.local` file and update the `MONGODB_URI` with your MongoDB connection string
   - For local MongoDB: `mongodb://localhost:27017/nextjs-express-app`
   - For MongoDB Atlas: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts          # GET /api/todos, POST /api/todos
│   │       └── [id]/
│   │           └── route.ts      # GET, PUT, DELETE /api/todos/[id]
│   ├── globals.css               # Tailwind CSS imports
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page component
├── lib/
│   ├── mongodb.ts               # MongoDB connection utility
│   └── global.d.ts              # Global type declarations
├── models/
│   └── Todo.ts                  # Mongoose Todo schema
├── .env.local                   # Environment variables (MongoDB URI)
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── next.config.js
```

## How It Works

This project demonstrates how Next.js API routes can replace a traditional Express.js backend:

1. **API Routes**: Located in `src/app/api/`, these files export functions named after HTTP methods (`GET`, `POST`, `PUT`, `DELETE`)
2. **Request Handling**: Each function receives a `NextRequest` object and returns a `NextResponse`
3. **Dynamic Routes**: The `[id]` folder creates dynamic routes for individual todo operations
4. **Client-Side**: The React components make HTTP requests to these API routes using the Fetch API

This approach gives you the simplicity of a full-stack application without needing a separate Express server!
