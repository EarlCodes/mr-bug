# Generated by Django 4.2 on 2023-07-05 07:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mrbug', '0006_alter_task_time_assigned_alter_task_time_completed_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='task_play',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='time_assigned',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='time_completed',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='time_start',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='time_worked',
            field=models.DurationField(blank=True, null=True),
        ),
    ]