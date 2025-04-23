
from rest_framework import serializers
from .models import *

class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluation  # Ton modèle d'évaluation
        fields = '__all__'

class EvalSerializer(serializers.ModelSerializer):
    evaluation = EvaluationSerializer(read_only=True)

    class Meta:
        model = EtudiantEvaluation
        fields = '__all__'
