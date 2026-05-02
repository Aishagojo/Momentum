from datetime import date

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Activity


class ActivityAPITests(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='aisha',
            email='aisha@example.com',
            password='strong-password-123',
        )
        self.other_user = get_user_model().objects.create_user(
            username='samira',
            email='samira@example.com',
            password='strong-password-123',
        )

    def test_user_can_create_activity(self):
        self.client.force_authenticate(self.user)

        response = self.client.post('/api/activities/', {
            'type': 'running',
            'duration': 35,
            'calories': 310,
            'distance': 5.2,
            'date': date.today().isoformat(),
            'notes': 'Easy pace',
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        activity = Activity.objects.get()
        self.assertEqual(activity.user, self.user)
        self.assertEqual(activity.type, 'running')

    def test_user_only_sees_their_own_activities(self):
        Activity.objects.create(
            user=self.user,
            type='walking',
            duration=20,
            calories=90,
            date=date.today(),
        )
        Activity.objects.create(
            user=self.other_user,
            type='cycling',
            duration=45,
            calories=400,
            date=date.today(),
        )

        self.client.force_authenticate(self.user)
        response = self.client.get('/api/activities/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['type'], 'walking')

    def test_activity_validation_rejects_negative_values(self):
        self.client.force_authenticate(self.user)

        response = self.client.post('/api/activities/', {
            'type': 'running',
            'duration': 0,
            'calories': -10,
            'distance': -1,
            'date': date.today().isoformat(),
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('duration', response.data)
        self.assertIn('calories', response.data)
        self.assertIn('distance', response.data)
