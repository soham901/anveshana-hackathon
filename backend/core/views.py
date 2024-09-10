from django.db.models import Q
from rest_framework.decorators import action
from django.db import transaction
from rest_framework.response import Response
from rest_framework.serializers import ChoiceField
from .serializers import OrderSerializer, UserSerializer
from rest_framework import viewsets, status, permissions
from django.contrib.auth.models import User
from .serializers import UserSerializer, RegisterSerializer, FarmerSerializer, ListBuyersSerializer, RegisterBuyerSerializer, ProfileSerializer, CropSerializer, CropDetailsSerializer

from .models import Buyer, Crop, CropCategory, Farmer, Order, Transaction


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


class CropViewSet(viewsets.ModelViewSet):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer
    permission_classes = [permissions.AllowAny]


class CropDetailsViewSet(viewsets.ModelViewSet):
    queryset = Crop.objects.all()
    serializer_class = CropDetailsSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
# class CropDetailsViewSet(viewsets.ModelViewSet):
#     queryset = Crop.objects.all()
#     serializer_class = CropDetailsSerializer
#     permission_classes = [permissions.AllowAny]

#     def get_serializer_context(self):
#         context = super().get_serializer_context()
#         context['request'] = self.request
#         return context


@transaction.atomic
def make_purchase(request):
    if not request.user.buyer:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'User is not a buyer'})
    
    oid = request.data.get('oid')
    if not oid:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'Order ID is required'})
    
    order = Order.objects.get(id=oid)
    
    if not order.farmer_agreed:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'Seller has not agreed to sell yet'})
    
    if order.status == 'completed':
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'Order already completed'})
    
    order.buyer_agreed = True
    order.status = 'completed'
    order.save()

    tran = Transaction.objects.create(order=order)
    tran.save()

    return Response(status=status.HTTP_200_OK)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['GET'])
    def fields(self, request):
        serializer_instance = self.get_serializer()
        field_info = {}
        for field_name, field in serializer_instance.fields.items():
            field_info[field_name] = {
                'type': field.__class__.__name__,
                'required': field.required,
                'read_only': field.read_only,
                'label': field.label,
                'help_text': field.help_text,
            }
            if isinstance(field, ChoiceField):
                field_info[field_name]['choices'] = field.choices
        return Response(field_info)

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(buyer__user=user)

    def perform_create(self, serializer):
        serializer.save()

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs.setdefault('context', self.get_serializer_context())
        
        if self.action == 'create':
            kwargs['fields'] = ['crop', 'quantity', 'price_per_kg']
        
        return serializer_class(*args, **kwargs)


class OrderDetailsViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter((Q(buyer__user=user) | Q(farmer__user=user)))
    