from rest_framework import serializers
from .models import BackgroundImage

class BackgroundImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BackgroundImage
        fields = ('id','image','date_time') 


