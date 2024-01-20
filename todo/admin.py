from django.contrib import admin
from .models import Task

admin.site.register(Task)



admin.site.site_title = 'TO DO'
admin.site.site_header = 'TO DO'