from django.shortcuts import render,get_object_or_404,redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth.decorators import login_required ,permission_required
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from .models import Task
from django.http import JsonResponse
import json
import datetime


def login(request):
    if request.method == 'GET':
        return render (request=request,template_name='todo/login.html')
    elif request.method == 'POST':
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        password = make_password(password)
    if not user:
        return HttpResponse('User not found')
    else:
        auth_login(request, user)
        request.session['username'] = username
        return render(request=request,template_name='todo/home.html',context={'username':username.upper()})


@login_required(login_url='login/')
def home(request):
    return render(request=request,template_name='todo/home.html')



def register(request):
    if request.method == 'GET':
        return render(request, 'todo/register.html')
    
    elif request.method == 'POST':
        try:
            username = request.POST['username']
            user = User.objects.get(username=username)
            if user.DoesNotExist==False:
                return HttpResponse('User is already exist')

        except User.DoesNotExist:
            first_name = request.POST['first_name']
            last_name = request.POST['last_name']
            password = make_password(request.POST['password'])
            email = request.POST['email']

            user = User(first_name = first_name, last_name = last_name, username = username, password = password, email = email)
            user.save()
            return render(request=request,template_name='todo/login.html')

    return render(request, 'todo/register.html')

# creating a task
def createTask(request):
    name = json.loads(request.body)['name']
    description = json.loads(request.body)['description']
    date = datetime.datetime.now()
    finishDate = json.loads(request.body)['finishDate']
    givenBy = request.user.username
    execute_by =json.loads(request.body)['execute']
    complete = False
    updateAt = datetime.datetime.now()
    task1 = Task.objects.create(name = name, description = description, given_date = date, finish_date = finishDate, given_by = givenBy,complete = complete,updated_at = updateAt,user_id_id = request.user.id)
    task1.save()
    return JsonResponse({"status": "ok"})

# get all tasks per user(read)
def get_tasks(request):
   
    current_user_id = request.user.id
    tasks_list=[]
    tasks = Task.objects.filter(user_id=current_user_id)
    for task in tasks:
       task_data ={
       'id':task.id,
       "name":task.name,
       'description':task.description,
       'given_date':task.given_date,
       'finish_date':task.finish_date,
       'given_by':task.given_by,
       'execute_by':task.execute_by,
       'complete':task.complete,
       'updated_at':task.updated_at
       }
       tasks_list.append(task_data)
    return JsonResponse({'tasks':tasks_list})



def delete_task(request,task_id):
    try:
        task = Task.objects.filter(id=task_id)
        task.delete()
        return JsonResponse({'deleted_task':task})
    except:
        return JsonResponse({"status":f"No such task with {task_id} id"})


def update_task(request,task_id):
    try:
        task = Task.objects.filter(id=task_id)
        complete = json.loads(request.body)['complete']
        if complete.lower() == 'true':
            complete == True
        else:
            complete ==False
        task.complete = complete
        task.save()
        return JsonResponse({'updated_task':task})
    except:
        return JsonResponse({"status":f"No such task with {task_id} id"})
    


def share_task():
    pass