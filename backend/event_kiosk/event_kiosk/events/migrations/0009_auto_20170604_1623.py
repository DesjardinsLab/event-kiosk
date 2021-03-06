# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-04 16:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0008_auto_20160202_1102'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='image',
            field=models.ImageField(null=True, upload_to='events/%Y/%m/%d/', verbose_name='image'),
        ),
        migrations.AlterField(
            model_name='speaker',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='speakers/%Y/%m/%d/', verbose_name='image'),
        ),
    ]
