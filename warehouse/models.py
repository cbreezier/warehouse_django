from django.db import models

# Create your models here.
"""
These models represent the warehouse layout
and the location of stock
"""
class StockType(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField(max_length=1000)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    weight = models.DecimalField(max_digits=10, decimal_places=2)
    volume = models.DecimalField(max_digits=10, decimal_places=2)
    def __unicode__(self):
        return self.name

class Warehouse(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=500)
    def __unicode__(self):
        return self.name

class Shelf(models.Model):
    warehouse = models.ForeignKey(Warehouse)

    # Brief descriptive name, eg 'Left' or 'Center right'
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=1000)
    def __unicode__(self):
        return self.name

class Bay(models.Model):
    shelf = models.ForeignKey(Shelf)
    bay_number = models.SmallIntegerField()
    def __unicode__(self):
        return 'Bay ' + str(self.bay_number) + ' (' + str(self.shelf) + ' shelf)'

class Pallet(models.Model):
    SIDE_CHOICES = (
        ('L', 'Left'),
        ('R', 'Right'),
    )
    bay = models.ForeignKey(Bay)
    row = models.SmallIntegerField()
    side = models.CharField(max_length=1, choices=SIDE_CHOICES)

    stock = models.ForeignKey(StockType, null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True)
    def __unicode__(self):
        return str(self.bay) + ' row ' + str(self.row) + ' ' + self.side

"""
These models describe the stock
and details related to faulty returns
"""
class Part(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    def __unicode__(self):
        return self.name

class Company(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField(max_length=1000)
    phone = models.CharField(max_length=20)
    def __unicode__(self):
        return self.name

class Status(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    def __unicode__(self):
        return self.name

class FaultyReturn(models.Model):
    stock = models.ForeignKey(StockType)
    fault = models.ForeignKey(Part)
    company = models.ForeignKey(Company)
    fault_date = models.DateTimeField()
    return_date = models.DateTimeField()
    status = models.ForeignKey(Status)
    def __unicode__(self):
        return str(self.stock) + ' ' + (self.fault) + ' fault, from ' + (self.company)

"""
Logbook for things - very important
"""
class Log(models.Model):
    TYPES = (
        ('ADD', 'Add to pallet'),
        ('MOV', 'Move from pallet to pallet'),
        ('GIV', 'Give/sell to company/customer'),
        ('RET', 'Company/customer returned a faulty fitting'),
        ('MOD', 'Modify return status'),
    )
    time = models.DateTimeField()
    log_type = models.CharField(max_length=3, choices=TYPES)
    pallet1 = models.ForeignKey(Pallet, null=True, blank=True, related_name='+')
    pallet2 = models.ForeignKey(Pallet, null=True, blank=True, related_name='+')
    stock = models.ForeignKey(StockType, null=True, blank=True)
    qty_moved = models.SmallIntegerField()
    qty_total = models.SmallIntegerField()
    company = models.ForeignKey(Company, null=True, blank=True)
    faulty_return = models.ForeignKey(FaultyReturn, null=True, blank=True)
    from_status = models.ForeignKey(Status, null=True, blank=True, related_name='+')
    to_status = models.ForeignKey(Status, null=True, blank=True, related_name='+')
    def __unicode__(self):
        return self.log_type