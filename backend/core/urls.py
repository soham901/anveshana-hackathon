from django.http import HttpResponse
from rest_framework import routers
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import RegisterViewSet, UserViewSet, ListFarmersViewSet, RegisterAsFarmerViewSet, ListBuyersViewSet, RegisterAsBuyerViewSet, ProfileViewSet, CropViewSet, CropDetailsSerializer, CropDetailsViewSet, make_purchase, OrderViewSet, OrderDetailsViewSet


router = routers.DefaultRouter()

router.register(r'profile', ProfileViewSet, basename='profile')

router.register(r'register-user', RegisterViewSet, basename='register')
router.register(r'users', UserViewSet, basename='users')

router.register(r'register-farmer', RegisterAsFarmerViewSet, basename='registerfarmer')
router.register(r'farmers', ListFarmersViewSet, basename='farmers')

router.register(r'register-buyer', RegisterAsBuyerViewSet, basename='registerbuyer')
router.register(r'buyers', ListBuyersViewSet, basename='buyers')

router.register(r'crops', CropViewSet, basename='crops')
router.register(r'crops/<str:id>', CropDetailsViewSet, basename='crops-details')
    

router.register(r'orders', OrderViewSet, basename='orders')

router.register(r'orders/<str:id>', OrderDetailsViewSet, basename='orders-details')

urlpatterns = [
    path("purchase", make_purchase, name="purchase"),
    path("", include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
