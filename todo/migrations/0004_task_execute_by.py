# Generated by Django 4.2.7 on 2024-01-30 01:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0003_task_share_with'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='execute_by',
            field=models.TextField(default='default', max_length=100),
            preserve_default=False,
        ),
    ]