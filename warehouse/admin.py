from django.contrib import admin
from django.contrib.auth.models import User, Group
from django.contrib.sites.models import Site
from warehouse.models import *

# Register your models here.
# admin.site.unregister(User)
# admin.site.unregister(Group)
# # admin.site.unregister(Site)

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