from django.contrib import admin
from . import models
# Register your models here.

class ImageModelAdmin(admin.ModelAdmin):
    list_display = ['id','date_time','user']
admin.site.register(models.ImageModel,ImageModelAdmin)

class BackgrounImageModelAdmin(admin.ModelAdmin):
    list_display = ['id','image','date_time']
admin.site.register(models.BackgroundImage,BackgrounImageModelAdmin)