# Generated by Django 4.2.3 on 2023-07-27 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='store',
            name='delivery_distance',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
