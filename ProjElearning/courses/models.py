from django.db import models
from users.models import Professeur, Etudiant



class Evaluation(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    ponderation = models.FloatField()
    access_code = models.CharField(max_length=20, unique=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    duration = models.IntegerField()
    status = models.CharField(max_length=20, choices=[('active', 'Active'), ('completed', 'Completed'), ('pending', 'Pending')])
    professeur = models.ForeignKey(Professeur, on_delete=models.CASCADE)

class EtudiantEvaluation(models.Model):
    etudiant = models.ForeignKey(Etudiant, on_delete=models.CASCADE)
    evaluation = models.ForeignKey(Evaluation, on_delete=models.CASCADE)
    note = models.FloatField(null=True, blank=True)
    date_passed = models.DateTimeField(auto_now_add=True)

