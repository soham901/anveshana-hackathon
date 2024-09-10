from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import viewsets, status, permissions
from django.contrib.auth.models import User
from .serializers import UserSerializer, RegisterSerializer, FarmerSerializer, ListBuyersSerializer, RegisterBuyerSerializer, ProfileSerializer

from .models import Buyer, Crop, CropCategory, CropImage, Farmer, Transaction


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.exclude(is_staff=True)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            password = serializer.validated_data.pop('password', None)
            user = User.objects.create_user(**serializer.validated_data)
            if password:
                user.set_password(password)
                user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class RegisterViewSet(viewsets.GenericViewSet):
    queryset = User.objects.none()  # We don't use queryset but it's required
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            password = serializer.validated_data.pop('password')
            if not password:
                return Response({"password": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)
            
            user = User.objects.create_user(**serializer.validated_data)
            user.set_password(password)
            user.save()
            
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.exclude(is_staff=True)



class RegisterAsFarmerViewSet(viewsets.GenericViewSet):
    # take all the fields from Farmer model and put the current user id in it
    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        farmer = Farmer.objects.create(user=request.user)
        farmer.save()
        return Response(FarmerSerializer(farmer).data, status=status.HTTP_201_CREATED)
    
    def update(self, request, pk):
        farmer = Farmer.objects.get(pk=pk)
        farmer.user = request.user
        farmer.save()
        return Response(FarmerSerializer(farmer).data, status=status.HTTP_200_OK)
    
    def destroy(self, request, pk):
        farmer = Farmer.objects.get(pk=pk)
        farmer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def list(self, request):
        farmers = Farmer.objects.all()
        return Response(FarmerSerializer(farmers, many=True).data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, pk):
        farmer = Farmer.objects.get(pk=pk)
        return Response(FarmerSerializer(farmer).data, status=status.HTTP_200_OK)



class ListFarmersViewSet(viewsets.ModelViewSet):
    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer
    permission_classes = [permissions.AllowAny]


class ListBuyersViewSet(viewsets.ModelViewSet):
    queryset = Buyer.objects.all()
    serializer_class = ListBuyersSerializer
    permission_classes = [permissions.AllowAny]


class RegisterAsBuyerViewSet(viewsets.GenericViewSet):
    queryset = Buyer.objects.all()
    serializer_class = RegisterBuyerSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)
