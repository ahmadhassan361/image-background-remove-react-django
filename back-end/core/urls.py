"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,re_path
from background_remover import views
from django.conf.urls.static import static
from django.views.static import serve
from django.views.decorators.csrf import csrf_exempt
from accounts import views as aviews
from admin_portal import views as adminViews
from django.conf import settings
urlpatterns = [
    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
    path('admin/', admin.site.urls),
    path('', views.index),
    path('api/login/', aviews.CutomAuthToken.as_view(), name='gettoken'),
    path('api/createuser/', csrf_exempt(aviews.CreateUserView.as_view())),
    path('api/change-password/', csrf_exempt(aviews.ChangePasswordView.as_view())),
    path('api/change-info/', csrf_exempt(aviews.ChangeUserInfoView.as_view())),
    path('api/change-profile-image/', csrf_exempt(aviews.ChangeProfileImageView.as_view())),
    path('api/remove-background/', csrf_exempt(views.removeImageBackground)),
    path('api/background-images/', views.backgroundImages),
    path('api/recaptcha/', csrf_exempt(aviews.recaptcha)),
    path('api/contact-us/', csrf_exempt(aviews.contact_us)),


    # Admin Panel
    path('admin-portal/', adminViews.dashboard, name='admin-dashboard'),
    path('admin-portal/user-overview', adminViews.user_overview, name='user-overview'),
    path('admin-portal/all-users', adminViews.all_users, name='all-users'),
    path('admin-portal/all-contact-us', adminViews.contact_users, name='contact-us'),
    path('admin-portal/admin-login', adminViews.admin_login, name='admin-login'),
    path('admin-portal/logout', adminViews.admin_logout, name='logout'),


    

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
