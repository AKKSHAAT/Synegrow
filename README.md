# Synegrow Task Management System API

## 📖Project Description

A simple RESTful service for managing tasks. It uses Express.js, TypeScript, Sequelize ORM, and SQLite for storage. The API supports CRUD operations, pagination, and search by title.

## Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the project:**

   ```bash
   npm run dev
   ```

   (or use `nodemon`/`ts-node` as configured)

## If you choose to make changes to the routes file
 **Generate Swagger/OpenAPI spec (optional):**
   ```bash
   npx ts-node ./src/generate-swagger.ts
   ```
   This will create a `swagger.json` file for API documentation.

## API Documentation

### Base URL

```
http://localhost:3000
```

### Endpoints

#### 1. Get All Tasks (with Pagination & Search)

```
GET /tasks?page=1&limit=10&title=meeting
```

**Query Parameters:**

- `page` (integer, optional): Page number (default: 1)
- `limit` (integer, optional): Items per page (default: 10)
- `title` (string, optional): Search for tasks containing this title

**Example Request:**

```
GET /tasks?page=2&limit=5&title=meeting
```

**Example Response:**

```json
{
  "message": "All Tasks",
  "tasks": [
    {
      "id": "...",
      "title": "Team meeting",
      "description": "Discuss project",
      "status": "PENDING",
      "createdAt": 1722000000000,
      "updatedAt": 1722000000000
    }
    // ...more tasks
  ],
  "pagination": {
    "total": 12,
    "page": 2,
    "limit": 5,
    "totalPages": 3
  }
}
```

#### 2. Get Task by ID

```
GET /tasks/:id
```

**Example Request:**

```
GET /tasks/123e4567-e89b-12d3-a456-426614174000
```

**Example Response:**

```json
{
  "message": "Task found",
  "task": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Team meeting",
    "description": "Discuss project",
    "status": "PENDING",
    "createdAt": 1722000000000,
    "updatedAt": 1722000000000
  }
}
```

#### 3. Create a Task

```
POST /tasks
```

**Request Body:**

```json
{
  "title": "Team meeting",
  "description": "Discuss project",
  "status": "PENDING"
}
```

**Example Response:**

```json
{
  "message": "Task saved",
  "task": {
    "id": "...",
    "title": "Team meeting",
    "description": "Discuss project",
    "status": "PENDING",
    "createdAt": 1722000000000,
    "updatedAt": 1722000000000
  }
}
```

#### 4. Update a Task

```
PUT /tasks/:id
```

**Request Body:**

```json
{
  "title": "Updated meeting",
  "description": "Discuss new agenda",
  "status": "IN_PROGRESS"
}
```

**Example Response:**

```json
{
  "message": "Task updated",
  "task": {
    "id": "...",
    "title": "Updated meeting",
    "description": "Discuss new agenda",
    "status": "IN_PROGRESS",
    "createdAt": 1722000000000,
    "updatedAt": 1722000000000
  }
}
```

#### 5. Delete a Task

```
DELETE /tasks/:id
```

**Example Response:**

```json
{
  "message": "Task deleted"
}
```

---

For more details, see the generated `swagger.json` or add JSDoc comments to your route files for OpenAPI support.
