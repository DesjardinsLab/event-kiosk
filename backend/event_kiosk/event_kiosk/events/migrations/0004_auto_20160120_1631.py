# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-20 21:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_event_registrationurl'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='speakers',
            field=models.ManyToManyField(null=True, to='events.Speaker'),
        ),
    ]
