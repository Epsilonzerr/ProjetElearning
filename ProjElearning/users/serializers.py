
from rest_framework import serializers
from .models import User  # ou ton modèle d'utilisateur

class UserSerializer(serializers.ModelSerializer): # type: ignore
     class Meta:
        model = User 
        fields = '__all__'
