# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-25 15:10
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import event_kiosk.content.models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0005_page_javascript'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='html',
            field=models.TextField(verbose_name='contenu (html)'),
        ),
        migrations.AlterField(
            model_name='page',
            name='icon',
            field=models.FileField(blank=True, null=True, upload_to='icons/%Y/%m/%d/', validators=[event_kiosk.content.models.validate_svg_files], verbose_name='icone (svg)'),
        ),
        migrations.AlterField(
            model_name='page',
            name='javascript',
            field=models.TextField(blank=True, help_text='Javascript optionnel qui sera exécuté au chargement de la page.', null=True, verbose_name='javascript'),
        ),
        migrations.AlterField(
            model_name='page',
            name='title',
            field=models.CharField(help_text="Titre de la page. Sera visible dans le menu et dans la barre d'application.", max_length=60, verbose_name='titre'),
        ),
        migrations.AlterField(
            model_name='page',
            name='weight',
            field=models.IntegerField(default=0, help_text='Les pages dans le menu seront ordonnées par poids.', verbose_name='poids'),
        ),
        migrations.AlterField(
            model_name='section',
            name='title',
            field=models.CharField(help_text='Nom de la section. Sera visible dans le menu.', max_length=60, verbose_name='titre'),
        ),
        migrations.AlterField(
            model_name='webasset',
            name='asset',
            field=models.FileField(help_text="Ajoutez n'importe quel fichier web qui seront sauvegardés sur le serveur pour l'utilisation sur la page, comme des images, du css, etc..", upload_to='assets/%Y/%m/%d/', verbose_name='fichier'),
        ),
        migrations.AlterField(
            model_name='webasset',
            name='page',
            field=models.ForeignKey(help_text='La page sur laquelle ce fichier est utilisé.', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assets', to='content.Page'),
        ),
    ]
