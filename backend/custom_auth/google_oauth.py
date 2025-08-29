# custom_auth/google_oauth.py
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
import re

User = get_user_model()

class GoogleOAuthView(APIView):
    permission_classes = []
    
    def post(self, request):
        # We'll implement this later after basic auth is working
        return Response({'error': 'Google OAuth not implemented yet'}, status=status.HTTP_501_NOT_IMPLEMENTED)