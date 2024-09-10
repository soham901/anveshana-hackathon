# Generated by Django 5.1.1 on 2024-09-10 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="CropImage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("url", models.URLField()),
            ],
        ),
        migrations.RemoveField(
            model_name="crop",
            name="images_urls",
        ),
        migrations.AddField(
            model_name="crop",
            name="images_urls",
            field=models.ManyToManyField(related_name="crops", to="core.cropimage"),
        ),
    ]
