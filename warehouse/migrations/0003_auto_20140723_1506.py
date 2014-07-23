# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('warehouse', '0002_auto_20140721_1402'),
    ]

    operations = [
        migrations.AddField(
            model_name='log',
            name='comments',
            field=models.TextField(default='', max_length=2000, blank=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='stocktype',
            name='qty_per_box',
            field=models.SmallIntegerField(default=0),
            preserve_default=False,
        ),
    ]
