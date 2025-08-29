from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.shortcuts import render
from django.conf import settings
from django.conf.urls.static import static

def api_documentation(request):
    """Custom API documentation page"""
    context = {
        'app_name': 'MOMENTUM FITNESS TRACKER',
        'developer': 'Aisha Omar Farah',
        'project_title': 'FitTrack - Personal Fitness Activity Logger API',
        'base_url': request.build_absolute_uri('/')[:-1],
        'api_version': 'v1'
    }
    return render(request, 'api_documentation.html', context)

# optional: provide swagger/redoc if drf_yasg is installed
try:
    from drf_yasg.views import get_schema_view
    from drf_yasg import openapi
    from rest_framework import permissions

    schema_view = get_schema_view(
        openapi.Info(
            title="Momentum API",
            default_version="v1",
            description="Momentum Fitness Tracker API Documentation",
            contact=openapi.Contact(email="aisha@example.com"),
            license=openapi.License(name="MIT License"),
        ),
        public=True,
        permission_classes=(permissions.AllowAny,),
    )

    SWAGGER_URLS = [
        path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
        path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
        path('swagger.yaml', schema_view.without_ui(cache_timeout=0), name='schema-yaml'),
    ]
except ImportError:
    SWAGGER_URLS = []

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('custom_auth.urls')),
    path('api/', include('api.urls')),
    path('', api_documentation, name='api-documentation'),
]

# append swagger routes if available
urlpatterns += SWAGGER_URLS

# serve media in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)