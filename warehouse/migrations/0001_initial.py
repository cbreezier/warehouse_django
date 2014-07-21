# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bay',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('bay_number', models.SmallIntegerField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('address', models.TextField(max_length=1000)),
                ('phone', models.CharField(max_length=20)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='FaultyReturn',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fault_date', models.DateTimeField()),
                ('return_date', models.DateTimeField()),
                ('company', models.ForeignKey(to='warehouse.Company')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time', models.DateTimeField()),
                ('log_type', models.CharField(max_length=3, choices=[(b'ADD', b'Add to pallet'), (b'MOV', b'Move from pallet to pallet'), (b'GIV', b'Give/sell to company/customer'), (b'RET', b'Company/customer returned a faulty fitting'), (b'MOD', b'Modify return status')])),
                ('qty_moved', models.SmallIntegerField()),
                ('qty_total', models.SmallIntegerField()),
                ('company', models.ForeignKey(blank=True, to='warehouse.Company', null=True)),
                ('faulty_return', models.ForeignKey(blank=True, to='warehouse.FaultyReturn', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Pallet',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('row', models.SmallIntegerField()),
                ('side', models.CharField(max_length=1, choices=[(b'L', b'Left'), (b'R', b'Right')])),
                ('quantity', models.IntegerField(null=True, blank=True)),
                ('bay', models.ForeignKey(to='warehouse.Bay')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='log',
            name='pallet2',
            field=models.ForeignKey(blank=True, to='warehouse.Pallet', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='log',
            name='pallet1',
            field=models.ForeignKey(blank=True, to='warehouse.Pallet', null=True),
            preserve_default=True,
        ),
        migrations.CreateModel(
            name='Part',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=1000)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='faultyreturn',
            name='fault',
            field=models.ForeignKey(to='warehouse.Part'),
            preserve_default=True,
        ),
        migrations.CreateModel(
            name='Shelf',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField(max_length=1000)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='bay',
            name='shelf',
            field=models.ForeignKey(to='warehouse.Shelf'),
            preserve_default=True,
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=1000)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='log',
            name='to_status',
            field=models.ForeignKey(blank=True, to='warehouse.Status', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='log',
            name='from_status',
            field=models.ForeignKey(blank=True, to='warehouse.Status', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='faultyreturn',
            name='status',
            field=models.ForeignKey(to='warehouse.Status'),
            preserve_default=True,
        ),
        migrations.CreateModel(
            name='StockType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20)),
                ('description', models.TextField(max_length=1000)),
                ('price', models.DecimalField(max_digits=10, decimal_places=2)),
                ('weight', models.DecimalField(max_digits=10, decimal_places=2)),
                ('volume', models.DecimalField(max_digits=10, decimal_places=2)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='pallet',
            name='stock',
            field=models.ForeignKey(blank=True, to='warehouse.StockType', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='log',
            name='stock',
            field=models.ForeignKey(blank=True, to='warehouse.StockType', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='faultyreturn',
            name='stock',
            field=models.ForeignKey(to='warehouse.StockType'),
            preserve_default=True,
        ),
        migrations.CreateModel(
            name='Warehouse',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=500)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='shelf',
            name='warehouse',
            field=models.ForeignKey(to='warehouse.Warehouse'),
            preserve_default=True,
        ),
    ]
