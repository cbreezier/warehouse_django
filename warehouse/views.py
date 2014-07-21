from django.shortcuts import render, get_object_or_404
from django.core import serializers
import json, datetime
from warehouse.models import Warehouse, Bay, Pallet

# Create your views here.
def warehouse(request, warehouse_name):
    warehouse_name = warehouse_name.replace('-', ' ')
    warehouse_info = get_object_or_404(Warehouse, name__iexact=warehouse_name)

    pallet_data = {};
    for bay in Bay.objects.all():
        pallets_in_bay = bay.pallet_set.extra(order_by=('-row', 'side'))
        pallet_array = [];
        for pallet in pallets_in_bay:
            if pallet.quantity is None:
                pallet.quantity = 0

            volume = 0
            if pallet.stock is None:
                volume = 0
            else:
                volume = pallet.stock.volume

            pallet_array.append({'bay': pallet.bay.id,
                                 'row': pallet.row,
                                 'side': pallet.side,
                                 'stock': str(pallet.stock),
                                 'qty': pallet.quantity,
                                 'volume': float(volume) * pallet.quantity})
        pallet_data[bay.bay_number] = pallet_array

    context = {
        'date_time': datetime.datetime.now().strftime('%I:%M%p (%d %b %Y)'),
        'warehouse': warehouse_info,
        'pallet_data': json.dumps(pallet_data),
        'pallet_volume': 160 * 160 * 160,
    }
    return render(request, 'warehouse/warehouse.html', context)