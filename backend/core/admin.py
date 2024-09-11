from django.contrib import admin
from .models import Buyer, Crop, CropCategory, Farmer, Transaction, Order


admin.site.register(Buyer)
admin.site.register(Crop)
admin.site.register(CropCategory)
admin.site.register(Farmer)
admin.site.register(Transaction)
admin.site.register(Order)

admin.site.site_header = "Fasal Mandi"
admin.site.site_title = "Fasal Mandi Admin Portal"
admin.site.index_title = "Welcome to Fasal Mandi Admin Portal"
