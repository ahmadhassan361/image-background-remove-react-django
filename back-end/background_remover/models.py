from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class ImageModel(models.Model):
    input_image = models.ImageField(upload_to ='images/upload/',default=None)
    output_image = models.CharField(max_length=500,default='')
    date_time = models.DateTimeField(auto_now_add=True)
    user = models.CharField(max_length=20)
