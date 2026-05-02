# Momentum Fitness Tracker API

Momentum is a Django REST Framework API for tracking personal fitness activities. It provides secure user registration, JWT-based authentication, profile management, and private activity logs for workouts such as running, cycling, swimming, walking, hiking, yoga, and weightlifting.

The project is structured as a backend API that can be connected to a web, mobile, or desktop client.

## Features

- User registration with password confirmation
- JWT login and token refresh using Simple JWT
- Authenticated user profile retrieval and updates
- Activity CRUD operations for each logged-in user
- Per-user data isolation so users only access their own activities
- Validation for duration, calories, and distance values
- Paginated activity responses
- Django admin support
- Swagger, ReDoc, JSON, and YAML API documentation
- SQLite for local development with MySQL configuration support

## Tech Stack

| Layer | Technology |
| --- | --- |
| Language | Python |
| Framework | Django 5.2 |
| API | Django REST Framework |
| Authentication | djangorestframework-simplejwt |
| Documentation | drf-yasg, Swagger UI, ReDoc |
| Database | SQLite by default, MySQL supported |
| Static Files | WhiteNoise |
| Environment Config | python-dotenv |
| CORS | django-cors-headers |

## Project Structure

```text
momentum/
├── backend/
│   ├── activities/       # Activity model, serializer, viewset, routes, and tests
│   ├── api/              # API router integration
│   ├── custom_auth/      # Custom user model, auth serializers, auth views, and tests
│   ├── momentum/         # Django project settings, URLs, ASGI, and WSGI config
│   ├── templates/        # API documentation template
│   ├── manage.py
│   └── requirements.txt
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.10 or newer
- pip
- virtualenv support through `python -m venv`
- MySQL client libraries if you plan to run with MySQL instead of SQLite

### Installation

From the repository root:

```bash
cd momentum/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The API will run at:

```text
http://127.0.0.1:8000/
```

## Environment Variables

Create a `.env` file in `momentum/backend/` when you want to override the development defaults.

```env
DJANGO_SECRET_KEY=change-me
DJANGO_DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0
USE_SQLITE=True
```

### MySQL Configuration

Set `USE_SQLITE=False` and provide database credentials:

```env
USE_SQLITE=False
DB_NAME=momentum_db
DB_USER=root
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=3306
```

## API Documentation

After starting the development server, visit:

| URL | Description |
| --- | --- |
| `/` | Custom API documentation page |
| `/swagger/` | Swagger UI |
| `/redoc/` | ReDoc documentation |
| `/swagger.json` | OpenAPI JSON schema |
| `/swagger.yaml` | OpenAPI YAML schema |

## Authentication

Authenticated endpoints require a bearer token:

```http
Authorization: Bearer <access_token>
```

### Auth Endpoints

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register/` | Register a new user and return JWT tokens | No |
| `POST` | `/api/auth/token/` | Log in and receive access and refresh tokens | No |
| `POST` | `/api/auth/token/refresh/` | Refresh an access token | No |
| `GET` | `/api/auth/profile/` | Get the current user's profile | Yes |
| `PUT/PATCH` | `/api/auth/profile/` | Update the current user's profile | Yes |

### Registration Example

```json
{
  "username": "aisha",
  "email": "aisha@example.com",
  "password": "strong-password-123",
  "password_confirm": "strong-password-123",
  "first_name": "Aisha",
  "last_name": "Farah",
  "date_of_birth": "1998-05-02",
  "fitness_level": "beginner"
}
```

## Activities

Activities belong to the authenticated user who creates them. Users cannot list, retrieve, update, or delete another user's activities.

### Activity Endpoints

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `GET` | `/api/activities/` | List the current user's activities | Yes |
| `POST` | `/api/activities/` | Create an activity | Yes |
| `GET` | `/api/activities/{id}/` | Retrieve one activity | Yes |
| `PUT/PATCH` | `/api/activities/{id}/` | Update one activity | Yes |
| `DELETE` | `/api/activities/{id}/` | Delete one activity | Yes |

### Activity Payload

```json
{
  "type": "running",
  "duration": 35,
  "calories": 310,
  "distance": 5.2,
  "date": "2026-05-02",
  "notes": "Easy pace"
}
```

### Activity Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `type` | string | Yes | One of `running`, `cycling`, `swimming`, `weightlifting`, `yoga`, `walking`, `hiking`, `other` |
| `duration` | integer | Yes | Duration in minutes. Must be greater than zero |
| `calories` | integer | Yes | Must not be negative |
| `distance` | number | No | Distance in kilometers. Must not be negative |
| `date` | date | Yes | Format: `YYYY-MM-DD` |
| `notes` | string | No | Optional notes about the activity |

## Testing

Run the test suite from the backend directory:

```bash
cd momentum/backend
USE_SQLITE=True python manage.py test
```

Current tests cover:

- User registration
- Password confirmation validation
- Activity creation
- Activity ownership isolation
- Activity field validation

## Useful Commands

```bash
# Activate the virtual environment
source .venv/bin/activate

# Create database tables
python manage.py migrate

# Create an admin user
python manage.py createsuperuser

# Run the local server
python manage.py runserver

# Run tests
USE_SQLITE=True python manage.py test

# Collect static files for deployment
python manage.py collectstatic
```

g


## Author

Developed by Aisha Omar Farah.
