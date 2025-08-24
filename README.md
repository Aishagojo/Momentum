# Momentum Fitness Tracker

A comprehensive full-stack web application for tracking and analyzing fitness activities, built with Django REST Framework backend and React frontend.

## Features

- **Activity Tracking**: Log workouts including running, cycling, swimming, and weightlifting
- **Progress Analytics**: View detailed summaries and trends of your fitness journey
- **Achievement System**: Earn badges and milestones for consistency and progress
- **User Authentication**: Secure login and registration system
- **RESTful API**: Clean and well-documented API endpoints

## Tech Stack

**Backend:**
- Python
- Django REST Framework
- MySQL Database
- JWT Authentication

**Frontend:**
- React.js
- Tailwind CSS
- Axios for API calls
- React Router

## Project Structure
momentum/
├── backend/ # Django REST API
│ ├── config/ # Project settings
│ ├── logs/ # Main application
│ ├── requirements.txt # Dependencies
│ └── manage.py # Django management
└── frontend/ # React application
├── src/ # Source code
└── package.json # Dependencies


## Installation & Setup

### Backend Setup:
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

cd frontend
npm install
npm run dev

API Endpoints
POST /api/auth/register/ - User registration

POST /api/auth/login/ - User login

GET /api/activities/ - List activities

POST /api/activities/ - Create activity

GET /api/analytics/ - Progress statistics

Author
Your Name - ALX Backend Student