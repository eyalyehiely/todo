from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Task(models.Model):
    name = models.TextField(max_length = 100)
    description= models.TextField(max_length = 250)
    given_date = models.DateField(default=timezone.now)
    finish_date = models.DateField(null=True, blank=True)
    given_by= models.TextField(max_length = 20)
    complete = models.TextField(max_length = 100)
    updated_at= models.DateTimeField()
    user_id = models.ForeignKey(User,on_delete = models.CASCADE)
    execute_by = models.TextField(max_length=100)