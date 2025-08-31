. Register User "mimi"
bash
curl -X POST http://127.0.0.1:8080/api/auth/register/ \
-H "Content-Type: application/json" \
-d '{
  "username": "mimi",
  "email": "mimi@example.com",
  "password": "mimi123",
  "password_confirm": "mimi123",
  "first_name": "Mimi",
  "last_name": "Omar"
}'

. Register User "mimi"
bash
curl -X POST http://127.0.0.1:8080/api/auth/register/ \
-H "Content-Type: application/json" \
-d '{
  "username": "mimi",
  "email": "mimi@example.com",
  "password": "mimi123",
  "password_confirm": "mimi123",
  "first_name": "Mimi",
  "last_name": "Omar"
}'

3. Create Activity for "mimi"

curl -X POST http://127.0.0.1:8080/api/activities/ \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-d '{
  "type": "yoga",
  "duration": 45,
  "calories": 150,
  "date": "2025-08-31",
  "notes": "Morning yoga session"
}'


// another one 
curl -X POST http://127.0.0.1:8080/api/activities/ \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-d '{
  "type": "running",
  "duration": 30,
  "calories": 250,
  "distance": 4.5,
  "date": "2025-08-31",
  "notes": "Evening run"
}'

  /// list all activtiy 

  //  get http://127.0.0.1:8080/api/activities/


  // profil 
  get http://127.0.0.1:8080/api/auth/profile/


  curl -X POST http://127.0.0.1:8080/api/activities/ \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-d '{
  "type": "swimming",
  "duration": 45,
  "calories": 320,
  "distance": 1.2,
  "date": "2025-08-31",
  "notes": "Pool swimming session"
}'


curl -X POST http://127.0.0.1:8080/api/activities/ \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-d '{
  "type": "swimming",
  "duration": 45,
  "calories": 320,
  "distance": 1.2,
  "date": "2025-08-31",
  "notes": "Pool swimming session"
}'