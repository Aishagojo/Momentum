# Momentum Fitness Tracker API

A high-performance REST API for fitness activity tracking, built with Django REST Framework. Provides full CRUD operations with JWT authentication.

## 🚀 Features

- **JWT Authentication** - Secure token-based auth system
- **Activity Management** - Complete CRUD for fitness activities
- **RESTful Design** - Clean, intuitive API endpoints
- **MySQL Database** - Scalable data storage
- **CORS Support** - Ready for frontend integration

## 📦 Installation

### Prerequisites
- Python 3.9+
- MySQL 5.7+
- pip

### Quick Setup
```bash
# Clone repository
git clone <your-repo-url>
cd momentum/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver


 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register/	User registration
POST	/api/auth/token/	Obtain JWT tokens
POST	/api/auth/token/refresh/	Refresh access token
Activities
Method	Endpoint	Description
GET	/api/activities/	List all activities
POST	/api/activities/	Create new activity
GET	/api/activities/{id}/	Get specific activity
PUT	/api/activities/{id}/	Update activity
DELETE	/api/activities/{id}/	Delete activity
💡 Usage Examples
User Registration
bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "securepass123",
    "password2": "securepass123",
    "email": "user@example.com"
  }'
User Login
bash
curl -X POST http://localhost:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "securepass123"
  }'
Create Activity
bash
curl -X POST http://localhost:8000/api/activities/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "type": "running",
    "duration": 30,
    "distance": 5.2,
    "calories": 350,
    "date": "2024-01-15"
  }'
Get All Activities
bash
curl -X GET http://localhost:8000/api/activities/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
