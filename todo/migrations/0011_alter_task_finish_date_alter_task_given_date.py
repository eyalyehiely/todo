# Generated by Django 4.2.7 on 2024-02-07 08:41

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0010_alter_task_complete'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='finish_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='given_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]