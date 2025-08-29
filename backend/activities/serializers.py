from rest_framework import serializers
from .models import Activity

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'
        read_only_fields = ('user',)

    def validate_duration(self, value):
        if value <= 0:
            raise serializers.ValidationError("Duration must be positive")
        return value

    def validate_calories_burned(self, value):
        if value < 0:
            raise serializers.ValidationError("Calories cannot be negative")
        return value