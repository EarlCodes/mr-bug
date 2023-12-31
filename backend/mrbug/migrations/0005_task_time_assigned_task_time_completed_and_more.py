# Generated by Django 4.2 on 2023-07-02 11:05

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('mrbug', '0004_remove_member_permissions_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='time_assigned',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='task',
            name='time_completed',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='task',
            name='time_start',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
