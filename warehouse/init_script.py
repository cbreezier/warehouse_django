from warehouse.models import Warehouse, Shelf, Bay, Pallet

w = Warehouse(
    name="WBS Slough Ave",
    address="Unit 32\n2 Slough Avenue\nSilverwater NSW 2128",
)
w.save()

s1 = Shelf(
    warehouse=w,
    name="Right",
    description="Rightmost shelf along the wall - currently this is the main shelf.",
)
s1.save()
s2 = Shelf(
    warehouse=w,
    name="Center Right",
    description="Center shelf on the right side - doesn't exist yet.",
)
s2.save()
s3 = Shelf(
    warehouse=w,
    name="Center Left",
    description="Center shelf on the left side - doesn't exist yet.",
)
s3.save()
s4 = Shelf(
    warehouse=w,
    name="Left",
    description="Leftmost shelf along the wall - currently this is the backup/storage shelf.",
)
s4.save()

for i in range(1, 21):
    Bay(shelf=s1, bay_number=i).save()

for i in range(21, 32):
    Bay(shelf=s4, bay_number=i).save()

for b in Bay.objects.all():
    for i in range(1, 5):
        Pallet(
            bay=b,
            row=i,
            side='L',
        ).save()
        Pallet(
            bay=b,
            row=i,
            side='R',
        ).save()