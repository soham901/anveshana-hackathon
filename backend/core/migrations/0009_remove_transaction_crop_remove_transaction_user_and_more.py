# Generated by Django 5.1.1 on 2024-09-11 00:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0008_order"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="transaction",
            name="crop",
        ),
        migrations.RemoveField(
            model_name="transaction",
            name="user",
        ),
        migrations.AddField(
            model_name="order",
            name="farmer",
            field=models.ForeignKey(
                default=None,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="orders",
                to="core.farmer",
            ),
        ),
        migrations.AddField(
            model_name="transaction",
            name="order",
            field=models.ForeignKey(
                default=None,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="orders",
                to="core.order",
            ),
        ),
        migrations.AlterField(
            model_name="farmer",
            name="preferred_quantity_unit",
            field=models.CharField(
                choices=[
                    ("kg", "Kilograms"),
                    ("qt", "Quintals"),
                    ("g", "Grams"),
                    ("ton", "Tons"),
                ],
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="buyer",
            field=models.ForeignKey(
                default=None,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="orders",
                to="core.buyer",
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="crop",
            field=models.ForeignKey(
                default=None,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="orders",
                to="core.crop",
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="status",
            field=models.CharField(
                choices=[
                    ("pending", "Pending"),
                    ("completed", "Completed"),
                    ("canceled", "Canceled"),
                ],
                default="pending",
                max_length=20,
            ),
        ),
    ]
