import datetime
from tkinter import Image
from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from background_remover.models import ImageModel
from django.db.models import Count
from django.db.models.functions import TruncDay
from accounts.models import ContactUsModel, ProfileModel
# Create your views here.
def dashboard(request):
    if not 'saved' in request.session or not request.session['saved']:
        return redirect('admin-login')
    user_count = User.objects.all().count()
    now = datetime.datetime.now()
    one_month_ago = datetime.datetime(now.year, now.month - 1, 1)
    date_from_24 = datetime.datetime.now() - datetime.timedelta(days=1)
    monthly_removed = ImageModel.objects.filter(date_time__range=[one_month_ago,now]).count()
    toady_removed = ImageModel.objects.filter(date_time__gte=date_from_24).count()
    total_removed = ImageModel.objects.all().count()

    # chart Request View
    lables = []
    values = []
    request_overview = request.GET.get('request',None)
    requestOverViewQuery = None
    overView = '7 Days'
    if(request_overview == '1'):
        requestOverViewQuery = ImageModel.objects.all().annotate(date=TruncDay('date_time')).values("date").annotate(created_count=Count('id')).order_by("date")[:30]
        overView = '1 Month'
    elif(request_overview == '6'):
        requestOverViewQuery = ImageModel.objects.all().annotate(date=TruncDay('date_time')).values("date").annotate(created_count=Count('id')).order_by("date")[:180]
        overView = '6 Months'
    else:
        requestOverViewQuery = ImageModel.objects.all().annotate(date=TruncDay('date_time')).values("date").annotate(created_count=Count('id')).order_by("date")[:7]


    for i in requestOverViewQuery:
        values.append(i['created_count'])
        lables.append('{}'.format(i['date'].date()))
        print('date={} count={}'.format(i['date'].date(),i['created_count']))



    unregistered_request = ImageModel.objects.filter(user='0').count()
    total_unregistered_request = (unregistered_request/total_removed) * 100
    print(int(total_unregistered_request))




    return render(request,
    'portal/dashboard.html',
    {
        'dashboard':True,
        'user_count':user_count,
        'background_monthly':monthly_removed,
        'total_removed':total_removed,
        'toady_removed':toady_removed,
        'lables':lables,
        'values':values,
        'overview_request':overView,
        'registered_user_request':[100-int(total_unregistered_request),int(total_unregistered_request)]
    }
    )

def user_overview(request):
    if not 'saved' in request.session or not request.session['saved']:
        return redirect('admin-login')
    total_user = User.objects.all().count()
    now = datetime.datetime.now()
    one_month_ago = datetime.datetime(now.year, now.month - 1, 1)
    date_from_24 = datetime.datetime.now() - datetime.timedelta(days=1)
    date_from_6_months = datetime.datetime.now() - datetime.timedelta(days=180)
    month_user = User.objects.filter(date_joined__range=[one_month_ago,now]).count()
    month_6_user = User.objects.filter(date_joined__range=[date_from_6_months,now]).count()
    today_user = User.objects.filter(date_joined__gte=date_from_24).count()


    lables = []
    values = []
    request_overview = request.GET.get('request',None)
    requestOverViewQuery = None
    overView = '7 Days'
    if(request_overview == '1'):
        requestOverViewQuery = User.objects.all().annotate(date=TruncDay('date_joined')).values("date").annotate(created_count=Count('id')).order_by("date")[:30]
        overView = '1 Month'
    elif(request_overview == '6'):
        requestOverViewQuery = User.objects.all().annotate(date=TruncDay('date_joined')).values("date").annotate(created_count=Count('id')).order_by("date")[:180]
        overView = '6 Months'
    else:
        requestOverViewQuery = User.objects.all().annotate(date=TruncDay('date_joined')).values("date").annotate(created_count=Count('id')).order_by("date")[:7]


    for i in requestOverViewQuery:
        values.append(i['created_count'])
        lables.append('{}'.format(i['date'].date()))
        print('date={} count={}'.format(i['date'].date(),i['created_count']))


    print(requestOverViewQuery)
    return render(request,'portal/user-overview.html',{
        'user_overview':True,
        'total_user':total_user,
        'today_user':today_user,
        'month_user':month_user,
        'month_6_user':month_6_user,
        'overview':overView,
        'lables':lables,
        'values':values,

    })
def all_users(request):
    if not 'saved' in request.session or not request.session['saved']:
        return redirect('admin-login')
    users = ProfileModel.objects.select_related().order_by('-id').all()
    return render(request,'portal/all-user.html',{
        'overview':True,
        'users':users
    })
def contact_users(request):
    if not 'saved' in request.session or not request.session['saved']:
        return redirect('admin-login')
    users = ContactUsModel.objects.order_by('-id').all()
    return render(request,'portal/all-contact.html',{
        'contact':True,
        'users':users
    })

def admin_login(request):
    if  'saved' not in request.session:
        if request.method == 'POST':
            username = request.POST.get('username',None)
            password = request.POST.get('password',None)
            if username == 'admin-background' and password == 'background-admin':
                request.session['saved'] = True
                return redirect('admin-dashboard')
    else:
        return redirect('admin-dashboard')
        
    return render(request,'portal/login.html')
    
def admin_logout(request):
    if 'saved' not in request.session:
        return redirect('admin-login')
    else:
        del request.session['saved']
        return redirect('admin-login')
