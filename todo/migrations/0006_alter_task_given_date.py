# Generated by Django 4.2.7 on 2024-02-03 12:30

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0005_remove_task_share_with'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='given_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
