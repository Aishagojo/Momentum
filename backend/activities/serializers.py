from rest_framework import serializers
from .models import Activity

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'updated_at')

    def validate_duration(self, value):
        if value <= 0:
            raise serializers.ValidationError("Duration must be greater than zero.")
        return value

    def validate_calories(self, value):
        if value < 0:
            raise serializers.ValidationError("Calories cannot be negative.")
        return value

    def validate_distance(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("Distance cannot be negative.")
        return value
