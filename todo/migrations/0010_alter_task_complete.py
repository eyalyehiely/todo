# Generated by Django 4.2.7 on 2024-02-03 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0009_alter_task_finish_date_alter_task_given_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='complete',
            field=models.TextField(max_length=100),
        ),
    ]
