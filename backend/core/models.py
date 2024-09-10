from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator

User = get_user_model()

class Farmer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    phone_no = models.CharField(max_length=20)
    location = models.CharField(max_length=255)
    profile_pic_url = models.URLField(blank=True)
    is_verified = models.BooleanField(default=False)
    languages_spoken = models.CharField(max_length=255)
    preferred_quantity_unit = models.CharField(max_length=20)

    farm_size = models.FloatField(validators=[MinValueValidator(0)])
    farming_since = models.DateField()
    preferred_selling_method = models.CharField(max_length=50)

    def __str__(self):
        return f"Farmer: {self.user.username}"


class Buyer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    phone_no = models.CharField(max_length=20)
    location = models.CharField(max_length=255)
    profile_pic_url = models.URLField(blank=True)
    is_verified = models.BooleanField(default=False)
    languages_spoken = models.CharField(max_length=255)
    preferred_quantity_unit = models.CharField(max_length=20)

    def __str__(self):
        return f"Buyer: {self.user.username}"


class CropCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class CropImage(models.Model):
    source = models.ImageField(null=True, blank=True)


class Crop(models.Model):
    category = models.ForeignKey(CropCategory, on_delete=models.CASCADE, related_name='crops')
    name = models.CharField(max_length=100)
    variety = models.CharField(max_length=100)
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE, related_name='crops')
    harvested_at = models.DateField()
    quantity = models.FloatField(validators=[MinValueValidator(0)])
    price_per_kg = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    location = models.CharField(max_length=255)
    irrigation_type = models.CharField(max_length=100)
    fertilizer_used = models.CharField(max_length=255)
    market_availability = models.BooleanField(default=True)
    storage_instruction = models.TextField()
    description = models.TextField()
    images_urls = models.ManyToManyField(CropImage, related_name='crops')
    cover_img_url = models.ImageField()

    def __str__(self):
        return f"{self.name} ({self.variety}) by {self.farmer.user.username}"


class Transaction(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('canceled', 'Canceled'),
    ]

    crop = models.ForeignKey(Crop, on_delete=models.CASCADE, related_name='transactions')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    quantity = models.FloatField(validators=[MinValueValidator(0)])
    price_per_kg = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    total_price = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"Transaction {self.id}: {self.crop.name} - {self.user.username}"

    def save(self, *args, **kwargs):
        if not self.total_price:
            self.total_price = self.quantity * self.price_per_kg
        super().save(*args, **kwargs)
