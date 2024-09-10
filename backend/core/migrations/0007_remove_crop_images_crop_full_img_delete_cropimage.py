# Generated by Django 5.1.1 on 2024-09-10 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0006_rename_cover_img_url_crop_cover_img_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="crop",
            name="images",
        ),
        migrations.AddField(
            model_name="crop",
            name="full_img",
            field=models.ImageField(blank=True, null=True, upload_to=""),
        ),
        migrations.DeleteModel(
            name="CropImage",
        ),
    ]
