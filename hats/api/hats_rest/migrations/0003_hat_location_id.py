# Generated by Django 4.0.3 on 2023-07-19 17:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hats_rest', '0002_remove_hat_location_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='hat',
            name='location_id',
            field=models.IntegerField(null=True),
        ),
    ]
