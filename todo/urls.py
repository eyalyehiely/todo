from django.urls import path
from . import views

urlpatterns = [
path('login/',views.login,name='login'),
path('register/',views.register,name='register'),
path('', views.home, name = 'home'),
path('api/create',views.createTask,name='createTask')

]
