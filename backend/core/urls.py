from rest_framework import routers
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import RegisterViewSet, UserViewSet, ListFarmersViewSet, RegisterAsFarmerViewSet, ListBuyersViewSet, RegisterAsBuyerViewSet


router = routers.DefaultRouter()

router.register(r'register-user', RegisterViewSet, basename='register')
router.register(r'users', UserViewSet, basename='users')

router.register(r'register-farmer', RegisterAsFarmerViewSet, basename='registerfarmer')
router.register(r'farmers', ListFarmersViewSet, basename='farmers')

router.register(r'register-buyer', RegisterAsBuyerViewSet, basename='registerbuyer')
router.register(r'buyers', ListBuyersViewSet, basename='buyers')


urlpatterns = [
    path("", include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
