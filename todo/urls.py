from django.urls import path
from . import views

urlpatterns = [
path('login/',views.login,name='login'),
path('register/',views.register,name='register'),
path('', views.home, name = 'home'),
path('api/create',views.createTask,name='createTask'),
path('api/read',views.get_tasks,name='get_tasks'),
path('api/delete/<int:task_id>/', views.delete_task, name='delete_task'),
path('api/update/<int:task_id>/',views.update_task, name ='update_task'),
path('api/execute_by',views.execute_by,name='execute_by'),
path('api/search/<str:input>/',views.search,name='search'),

]
