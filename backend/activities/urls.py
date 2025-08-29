from django.urls import path
from .views import test_view, activity_list

urlpatterns = [
    path('test/', test_view, name='test'),
    path('', activity_list, name='activity-list'),
]