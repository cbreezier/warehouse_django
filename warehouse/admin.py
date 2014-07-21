from django.contrib import admin
from warehouse.models import *

# Register your models here.
admin.site.register(StockType, admin.ModelAdmin)
admin.site.register(Warehouse, admin.ModelAdmin)
admin.site.register(Shelf, admin.ModelAdmin)
admin.site.register(Bay, admin.ModelAdmin)
admin.site.register(Pallet, admin.ModelAdmin)
admin.site.register(Part, admin.ModelAdmin)
admin.site.register(Company, admin.ModelAdmin)
admin.site.register(Status, admin.ModelAdmin)
admin.site.register(FaultyReturn, admin.ModelAdmin)
admin.site.register(Log, admin.ModelAdmin)