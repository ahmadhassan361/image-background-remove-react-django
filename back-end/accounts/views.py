from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from .serializers import ProfileSerializer, UserSerializer,ChangePasswordSerializer,ChangeUserInfoSerializer,ChangeProfileImageSerializer
from rest_framework import generics
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth.models import User
from .models import ContactUsModel, ProfileModel
from rest_framework import status
import requests
from rest_framework.decorators import api_view
# Create your views here.

#Create User , SignUp
@method_decorator(csrf_exempt,name='post')
class CreateUserView(generics.CreateAPIView):
    model = User
    permission_classes = [
        permissions.AllowAny # Or anon users can't register
    ]
    serializer_class = UserSerializer

#Login User and Get Token
class CutomAuthToken(ObtainAuthToken):
    permission_classes = [permissions.AllowAny ]
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created =Token.objects.get_or_create(user=user)
        profileModel = ProfileModel.objects.get(user=user)
        print(profileModel)
        profileSerialized = ProfileSerializer(profileModel,many=False)
        return Response({
            'token':token.key,
            'user_id':user.pk,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'profile_img': profileSerialized.data['profile_img']
        }) 

class ChangePasswordView(generics.UpdateAPIView):
        """
        An endpoint for changing password.
        """
        serializer_class = ChangePasswordSerializer
        model = User
        permission_classes = (IsAuthenticated,)

        def get_object(self, queryset=None):
            obj = self.request.user
            return obj

        def update(self, request, *args, **kwargs):
            self.object = self.get_object()
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                # Check old password
                if not self.object.check_password(serializer.data.get("old_password")):
                    return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
                # set_password also hashes the password that the user will get
                self.object.set_password(serializer.data.get("new_password"))
                self.object.save()
                response = {
                    'status': 'success',
                    'code': status.HTTP_200_OK,
                    'message': 'Password updated successfully',
                    'data': []
                }

                return Response(response)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangeUserInfoView(generics.UpdateAPIView):
        """
        An endpoint for changing password.
        """
        serializer_class = ChangeUserInfoSerializer
        model = User
        permission_classes = (IsAuthenticated,)

        def get_object(self, queryset=None):
            obj = self.request.user
            return obj

        def update(self, request, *args, **kwargs):
            self.object = self.get_object()
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                # Check Name is not empty
                if  serializer.data.get("first_name")=='' or  serializer.data.get("last_name") == '':
                    return Response({"first_name": ["name must not be empty."],"last_name": ["name must not be empty."]}, status=status.HTTP_400_BAD_REQUEST)
                # set Names
                self.object.first_name = serializer.data.get("first_name")
                self.object.last_name = serializer.data.get("last_name")
                self.object.save()
                response = {
                    'status': 'success',
                    'code': status.HTTP_200_OK,
                    'message': 'Name updated successfully',
                    'data': []
                }

                return Response(response)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangeProfileImageView(generics.UpdateAPIView):
        """
        An endpoint for changing password.
        """
        serializer_class = ChangeProfileImageSerializer
        model = User
        permission_classes = (IsAuthenticated,)

        def get_object(self, queryset=None):
            obj = ProfileModel.objects.get(user = self.request.user)
            return obj

        def update(self, request, *args, **kwargs):
            self.object = self.get_object()
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                # set_password also hashes the password that the user will get
                self.object.profile_img = request.FILES.get('profile_img')
                self.object.save()
                profileSerialized = ProfileSerializer(self.object,many=False)
                response = {
                    'status': 'success',
                    'code': status.HTTP_200_OK,
                    'message': 'Image updated successfully',
                    'image': profileSerialized.data['profile_img']
                }

                return Response(response)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
@permission_classes([AllowAny])
def recaptcha(request):
    r = requests.post(
      'https://www.google.com/recaptcha/api/siteverify',
      data={
        'secret': '6LdWvO0hAAAAAPjraroAdnSO_7DOxqZnSYSJZS_6',
        'response': request.data['captcha_value'],
      }
    )

    return Response({'captcha': r.json()})

@api_view(['POST'])
@permission_classes([AllowAny])
def contact_us(request):
    if request.method == "POST":
        name = request.POST.get('name','')
        email = request.POST.get('email','')
        message = request.POST.get('message','')
        
        contact = ContactUsModel(name=name,email=email,message=message)
        contact.save()
        response = {
                    'status': 'success',
                    'code': status.HTTP_200_OK,
                    'message': 'Your request submitted successfully',
                }
        return Response(response)
