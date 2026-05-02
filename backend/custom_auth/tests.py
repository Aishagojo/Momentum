from rest_framework import status
from rest_framework.test import APITestCase


class AuthenticationAPITests(APITestCase):
    def test_register_returns_user_and_tokens(self):
        response = self.client.post('/api/auth/register/', {
            'username': 'aisha',
            'email': 'aisha@example.com',
            'password': 'strong-password-123',
            'password_confirm': 'strong-password-123',
            'first_name': 'Aisha',
            'last_name': 'Farah',
            'fitness_level': 'beginner',
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertEqual(response.data['user']['username'], 'aisha')

    def test_register_requires_matching_passwords(self):
        response = self.client.post('/api/auth/register/', {
            'username': 'aisha',
            'email': 'aisha@example.com',
            'password': 'strong-password-123',
            'password_confirm': 'different-password',
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password_confirm', response.data)
