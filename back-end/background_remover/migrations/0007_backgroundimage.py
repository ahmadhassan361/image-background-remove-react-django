# Generated by Django 4.1 on 2022-09-14 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('background_remover', '0006_alter_imagemodel_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='BackgroundImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default=None, upload_to='images/background-images/')),
                ('date_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]