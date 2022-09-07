from accounts.models import ProfileModel
from django.shortcuts import render
from rembg import remove
from PIL import Image
from .models import ImageModel
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.sites.models import Site
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User,AnonymousUser
# Create your views here.


def index(request):
    if request.method == "POST":

        input_image = request.FILES.get("file")
        image_model = ImageModel(input_image=input_image)
        image_model.save()
        print(input_image)
        image_name = input_image.name.split('.')
        output_path = 'media/images/output/{}-{}bg-remover-preview.png'.format(
            image_model.id, image_name[0])
        input = Image.open(input_image)
        output = remove(input)
        output.save(output_path)
        image_model.output_image = output_path
        image_model.save()

    return render(request, 'index.html')


@api_view(['POST'])
@permission_classes([AllowAny])
def removeImageBackground(request):
    if request.method == "POST":
        
        try:
            input_image = request.FILES.get("file")
            image_model = ImageModel(input_image=input_image)
            image_model.save()
            print(input_image)
            image_name = input_image.name.split('.')
            output_path = 'media/images/output/{}-{}bg-remover-preview.png'.format(
                image_model.id, image_name[0])
            input = Image.open(input_image)
            output = remove(input)
            output.save(output_path)
            image_model.output_image = output_path
            pass
            domain = Site.objects.get_current().domain
            user_id = request.POST.get("user_id", None)
            if user_id is not None:
                try:
                    user = User.objects.get(pk=user_id)
                    profile_model = ProfileModel.objects.get(user=user)
                    profile_model.use_remover = profile_model.use_remover + 1
                    profile_model.save()
                    image_model.user = user_id
                except:
                    pass
            else:
                image_model.user = "0"
            image_model.save()
            return Response({
                'status': status.HTTP_200_OK,
                'message': 'background removed successfully',
                'image': 'http://{}/{}'.format(domain, image_model.output_image)
            })
        except:
            return Response({'status': status.HTTP_400_BAD_REQUEST,
                             'message': 'oops! Something went wrong',
                             'image': ''})
