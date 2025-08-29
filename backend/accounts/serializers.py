from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from activities.models import Activity  # adjust import if Activity lives elsewhere

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "fitness_level")
        read_only_fields = ("id", "email")

class RegisterSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "password", "password_confirm", "first_name", "last_name", "fitness_level")
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        if attrs.get("password") != attrs.pop("password_confirm", None):
            raise serializers.ValidationError({"password_confirm": "Passwords do not match."})
        validate_password(attrs.get("password"), self.instance)
        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ("id", "user", "activity_type", "duration_minutes", "distance_km", "calories", "notes", "date")
        read_only_fields = ("id", "user")