from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    name = models.TextField(max_length = 100)
    description= models.TextField(max_length = 250)
    given_date = models.DateTimeField()
    finish_date = models.DateTimeField()
    given_by= models.TextField(max_length = 20)
    complete = models.BooleanField()
    updated_at= models.DateTimeField()
    user_id = models.ForeignKey(User,on_delete = models.CASCADE)
    share_with = models.TextField(max_length = 20)