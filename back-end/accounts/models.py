from django.db import models

# Create your models here.
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class ProfileModel(models.Model):
    profile_img = models.ImageField(upload_to="images/profile",default='',blank=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    use_remover = models.BigIntegerField(default=0) 


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None,created=False,**kwargs):
    if created:
        Token.objects.create(user=instance)
        ProfileModel.objects.create(user = instance)


class ContactUsModel(models.Model):
    name = models.CharField(max_length=200,default='')
    email = models.CharField(max_length=200,default='')
    message = models.TextField(default='')
    date_time = models.DateTimeField(auto_now_add=True)