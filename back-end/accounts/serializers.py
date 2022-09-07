from pyexpat import model
from xml.dom import ValidationErr
from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ProfileModel
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileModel
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class ChangeUserInfoSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

class ChangeProfileImageSerializer(serializers.Serializer):
    # model = ProfileModel

    # """
    # Serializer for password change endpoint.
    # """
    # profile_img = serializers.ImageField(required=True)
    profile_img = serializers.ImageField()

    def validate_avatar(self, image):
        # 12MB
        MAX_FILE_SIZE = 12000000
        print(image.name)
        if image.size > MAX_FILE_SIZE:
            print(image.size)
            raise ValidationErr("File size too big!")


    class Meta:
        model = ProfileModel
        fields = ('profile_img',)