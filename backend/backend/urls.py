from django.contrib import admin
from django.urls import path, include

from . import settings

urlpatterns = [
    path("api-auth/", include('rest_framework.urls')),
    path("admin/", admin.site.urls),
    path("", include("core.urls")),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
