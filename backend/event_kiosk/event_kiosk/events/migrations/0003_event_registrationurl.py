# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-20 16:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_auto_20160119_1651'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='registrationUrl',
            field=models.URLField(blank=True, help_text='URL for registrations to this event. Will be embedded in the QR code.', null=True, verbose_name='registration url'),
        ),
    ]