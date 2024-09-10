from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Buyer, Crop, CropCategory, Farmer, CropImage, Transaction


class UFarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        exclude = ('user',)

class UBuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyer
        exclude = ('user',)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    role_details = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['user', 'role', 'role_details']

    def get_role(self, obj):
        if hasattr(obj, 'farmer'):
            return 'Farmer'
        elif hasattr(obj, 'buyer'):
            return 'Buyer'
        return 'Unknown'

    def get_role_details(self, obj):
        if hasattr(obj, 'farmer'):
            return UFarmerSerializer(obj.farmer).data
        elif hasattr(obj, 'buyer'):
            return UBuyerSerializer(obj.buyer).data
        return None


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'email': {'required': True}}

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value


class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields = '__all__'
        read_only_fields = ['user']

    def create(self, validated_data):
        farmer = Farmer.objects.create(**validated_data)
        farmer.user = self.context['request'].user
        farmer.save()
        return farmer

    def update(self, instance, validated_data):
        instance.phone_no = validated_data.get('phone_no', instance.phone_no)
        instance.location = validated_data.get('location', instance.location)
        instance.profile_pic = validated_data.get('profile_pic', instance.profile_pic)
        instance.is_verified = validated_data.get('is_verified', instance.is_verified)
        instance.languages_spoken = validated_data.get('languages_spoken', instance.languages_spoken)
        instance.preferred_quantity_unit = validated_data.get('preferred_quantity_unit', instance.preferred_quantity_unit)
        instance.farm_size = validated_data.get('farm_size', instance.farm_size)
        instance.farming_since = validated_data.get('farming_since', instance.farming_since)
        instance.preferred_selling_method = validated_data.get('preferred_selling_method', instance.preferred_selling_method)
        instance.save()
        return instance
    

class ListBuyersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyer
        fields = '__all__'
        read_only_fields = ['user']



class RegisterBuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyer
        fields = '__all__'
        read_only_fields = ['user']


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
