# Generated by Django 5.1.7 on 2025-03-30 22:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('courses', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cours',
            name='professeur',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.professeur'),
        ),
        migrations.AddField(
            model_name='evaluation',
            name='cours',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.cours'),
        ),
    ]
