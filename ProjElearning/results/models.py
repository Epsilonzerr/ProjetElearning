from django.db import models
from users.models import Etudiant
from questions.models import Question, ReponseEtudiant

class Resultat(models.Model):
    etudiant = models.ForeignKey(Etudiant, on_delete=models.CASCADE)
    score = models.FloatField()
    status = models.CharField(max_length=20)
    date_creation = models.DateTimeField(auto_now_add=True)

class AIRecommandation(models.Model):
    etudiant = models.ForeignKey(Etudiant, on_delete=models.CASCADE)
    evaluation = models.ForeignKey('courses.Evaluation', on_delete=models.CASCADE)
    suggested_resources = models.TextField()
    date_generation = models.DateTimeField(auto_now_add=True)

    def generate_recommendation(self):
        # Logique d’IA pour générer les recommandations
        pass
