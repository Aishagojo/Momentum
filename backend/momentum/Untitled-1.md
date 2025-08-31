
// create user 

curl -X POST http://127.0.0.1:8080/api/auth/register/ \
-H "Content-Type: application/json" \
-d '{
  "username": "mim",
  "email": "mim@example.com",
  "password": "mim123",
  "password_confirm": "mimi123",
  "first_name": "Mim",
  "last_name": "Omar"
}'


get token access


//
curl -X POST http://127.0.0.1:8080/api/auth/token/ \
-H "Content-Type: application/json" \
-d '{
  "username": "mim",
  "password": "mim123"
}'



// creating active 
url -X POST http://127.0.0.1:8080/api/activities/ \
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



//  get all the actives 

curl -X GET http://127.0.0.1:8080/api/activities/ \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"

// delte ot 

curl -X DELETE http://127.0.0.1:8080/api/activities/3/ \