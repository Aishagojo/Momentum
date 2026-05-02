from django.contrib import admin
from .models import Activity


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'type', 'duration', 'calories', 'distance', 'date')
    list_filter = ('type', 'date')
    search_fields = ('user__username', 'user__email', 'notes')
    ordering = ('-date', '-created_at')
