# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-21 17:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0004_auto_20160120_1631'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='javascript',
            field=models.TextField(blank=True, help_text='Optional javascript that will be executed when the page loads.', null=True, verbose_name='javascript'),
        ),
    ]
