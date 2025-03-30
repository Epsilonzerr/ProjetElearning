from django.db import models
from users.models import Professeur, Etudiant

class Cours(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    access_code = models.CharField(max_length=20, unique=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    professeur = models.ForeignKey(Professeur, on_delete=models.CASCADE)

class Evaluation(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    ponderation = models.FloatField()
    access_code = models.CharField(max_length=20, unique=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    duration = models.IntegerField()  # Durée en minutes
    cours = models.ForeignKey(Cours, on_delete=models.CASCADE)

