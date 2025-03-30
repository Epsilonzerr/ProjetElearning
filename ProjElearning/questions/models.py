from django.db import models
from courses.models import Evaluation

class Question(models.Model):
    TYPE_CHOICES = (
        ('qcm', 'QCM'),
        ('direct', 'Réponse Directe'),
        ('problematique', 'Problématique'),
    )
    evaluation = models.ForeignKey(Evaluation, on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    content = models.TextField()
    image_url = models.URLField(blank=True, null=True)
    date_creation = models.DateTimeField(auto_now_add=True)

class Reponse(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.TextField()
    is_correct = models.BooleanField(default=False)

class ReponseEtudiant(models.Model):
    etudiant = models.ForeignKey('users.Etudiant', on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer_text = models.TextField()
    image_url = models.URLField(blank=True, null=True)
    date_generation = models.DateTimeField(auto_now_add=True)
    score = models.FloatField()
    feedback = models.TextField(blank=True, null=True)
