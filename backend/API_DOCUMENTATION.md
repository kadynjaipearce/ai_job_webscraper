# AI Job Webscraper API Documentation

## Base URL

```
https://your-api-domain.com/api
```

## Response Format

All responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

### Error Response

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": 400,
    "message": "Error description"
  }
}
```

---

## Health Endpoints

### GET /api/health

Health check endpoint. Returns the status of the API and database connection.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "database": "connected",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

**Response (503 Service Unavailable):**
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": 503,
    "message": "Database disconnected"
  }
}
```

### GET /api/ready

Readiness check. Returns 200 if the service is ready to accept traffic.

**Response (200 OK):** Empty body

**Response (503 Service Unavailable):** Empty body

### GET /api/live

Liveness check. Returns 200 if the service is alive.

**Response (200 OK):**
```json
{
  "status": "alive",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

## Job Endpoints

### POST /api/jobs/scrape/indeed

Scrape job listings from Indeed.

**Request Body:**
```json
{
  "job_title": "software engineer",
  "location": "san francisco"
}
```

**Parameters:**
- `job_title` (required): Job title to search for
- `location` (required): Location to search in

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total_scraped": 25,
    "new_listings": 20,
    "duplicates_skipped": 5,
    "listings": [
      {
        "id": "listing_id",
        "title": "Software Engineer",
        "company": "Tech Corp",
        "location": "San Francisco, CA",
        "salary": "$120,000 - $180,000",
        "description_snippet": "We are looking for...",
        "url": "https://indeed.com/job/...",
        "indeed_job_key": "abc123",
        "source": "indeed",
        "scraped_at": "2024-01-01T00:00:00Z",
        "created_at": "2024-01-01T00:00:00Z",
        "updated_at": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "code": 400,
    "message": "job_title is required"
  }
}
```

---

### GET /api/jobs

List all job listings with pagination, filtering, and sorting.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 10 | Items per page (max: 100) |
| `title` | string | - | Filter by job title (partial match) |
| `company` | string | - | Filter by company name |
| `location` | string | - | Filter by location |
| `source` | string | - | Filter by job board source |
| `sort_by` | string | "created_at" | Sort field (created_at, title, company) |
| `sort_order` | string | "desc" | Sort order (asc, desc) |

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "listing_id",
        "title": "Software Engineer",
        "company": "Tech Corp",
        "location": "San Francisco, CA",
        "salary": "$120,000 - $180,000",
        "description_snippet": "We are looking for...",
        "url": "https://indeed.com/job/...",
        "indeed_job_key": "abc123",
        "source": "indeed",
        "scraped_at": "2024-01-01T00:00:00Z",
        "created_at": "2024-01-01T00:00:00Z",
        "updated_at": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "total_pages": 10
    }
  }
}
```

---

### GET /api/jobs/{id}

Get a single job listing by ID.

**Path Parameters:**
- `id` (required): The job listing ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "listing_id",
    "title": "Software Engineer",
    ...
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "code": 404,
    "message": "Job listing with ID 'xyz' not found"
  }
}
```

---

### POST /api/jobs/{id}/delete

Delete a job listing by ID.

**Path Parameters:**
- `id` (required): The job listing ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Job listing deleted successfully",
    "id": "listing_id"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "code": 404,
    "message": "Job listing with ID 'xyz' not found"
  }
}
```

---

### GET /api/jobs/search

Search jobs by keyword across title and company.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | string | Search term for job title |
| `company` | string | Search term for company name |
| `page` | integer | Page number |
| `limit` | integer | Items per page |
| `location` | string | Filter by location |
| `source` | string | Filter by source |

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "data": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "total_pages": 5
    }
  }
}
```

---

### GET /api/jobs/sources

Get available job sources.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "sources": ["indeed", "linkedin", "seek"]
  }
}
```

---

### GET /api/jobs/stats

Get job statistics.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total_jobs": 500,
    "jobs_by_source": {
      "indeed": 300,
      "linkedin": 150,
      "seek": 50
    }
  }
}
```

---

## User Endpoints

### GET /api/users

List all users with pagination.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 10 | Items per page (max: 100) |

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "user_id",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "created_at": "2024-01-01T00:00:00Z",
        "updated_at": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "total_pages": 10
    }
  }
}
```

---

### GET /api/users/{id}

Get a single user by ID.

**Path Parameters:**
- `id` (required): The user ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "code": 404,
    "message": "User with ID 'xyz' not found"
  }
}
```

---

### POST /api/users

Create a new user.

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com"
}
```

**Parameters:**
- `first_name` (required): User's first name
- `last_name` (required): User's last name
- `email` (required): User's email address

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "code": 400,
    "message": "first_name is required"
  }
}
```

**Error Response (409 Conflict):**
```json
{
  "success": false,
  "error": {
    "code": 409,
    "message": "User with this email already exists"
  }
}
```

---

### PATCH /api/users/{id}

Update a user by ID.

**Path Parameters:**
- `id` (required): The user ID

**Request Body:**
```json
{
  "first_name": "Jane",
  "last_name": "Smith"
}
```

**Parameters (all optional):**
- `first_name`: User's new first name
- `last_name`: User's new last name

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

---

### POST /api/users/{id}/delete

Delete a user by ID.

**Path Parameters:**
- `id` (required): The user ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "User deleted successfully",
    "id": "user_id"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "code": 404,
    "message": "User with ID 'xyz' not found"
  }
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid request parameters |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting

Coming soon...

---

## Authentication

Authentication is not yet implemented. Future versions will include JWT-based authentication.
