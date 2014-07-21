from django.shortcuts import render, get_object_or_404
from warehouse.models import Warehouse

# Create your views here.
def warehouse(request, warehouse_name):
    warehouse_name = warehouse_name.replace('-', ' ')
    warehouse_info = get_object_or_404(Warehouse, name__iexact=warehouse_name)
    context = {
        'warehouse': warehouse_info,
    }
    return render(request, 'warehouse/warehouse.html', context)