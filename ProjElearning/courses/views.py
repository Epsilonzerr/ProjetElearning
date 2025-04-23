from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Evaluation,EtudiantEvaluation
from .serializers import EvalSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from users.models import User
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import EtudiantEvaluation, Evaluation
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Evaluation, EtudiantEvaluation
from users.models import Etudiant
from django.http import JsonResponse
from .models import EtudiantEvaluation, Evaluation

def get_evaluations(request, user_id):
    try:
        etudiant_evaluations = EtudiantEvaluation.objects.filter(etudiant__user_id=user_id).select_related('evaluation')
    except EtudiantEvaluation.DoesNotExist:
        return JsonResponse({'error': 'No evaluations found for this student'}, status=404)
    
    active = []
    completed = []

    if not etudiant_evaluations:
        return JsonResponse({'error': 'No evaluations available for this user'}, status=404)

    for ee in etudiant_evaluations:
        eval = ee.evaluation
        if eval.status == 'active':
            eval_data = {
                'duration': eval.duration,
                'title': eval.title,
                'description': eval.description,
                'dateStart': eval.date_creation,
                'status': eval.status,
                'code': eval.access_code,
            }
            active.append(eval_data)
        elif eval.status == 'completed':
            eval_data = {
                'duration': eval.duration,
                'title': eval.title,
                'description': eval.description,
                'dateStart': eval.date_creation,
                'status': eval.status,
                'code': eval.access_code,
            }
            completed.append(eval_data)

    return JsonResponse({'active': active, 'completed': completed})

class JoinEvaluationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print("🔔 Requête reçue pour rejoindre une évaluation")

        code = request.data.get("code")
        user_id = request.data.get("userId")
        print(f"➡️ Code reçu : {code}, User ID : {user_id}")

        if not code or not user_id:
            print("❌ Code ou userId manquant")
            return Response({"error": "Code et userId sont requis."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Vérifier que l'évaluation existe
            print("🔍 Recherche de l'évaluation...")
            evaluation = Evaluation.objects.get(access_code=code)
            print(f"✅ Évaluation trouvée : {evaluation}")

            # Vérifier que l'étudiant existe
            print("🔍 Recherche de l'étudiant...")
            etudiant = Etudiant.objects.get(user__id=user_id)
            print(f"✅ Étudiant trouvé : {etudiant}")

            # Vérifier s’il est déjà inscrit
            if EtudiantEvaluation.objects.filter(etudiant=etudiant, evaluation=evaluation).exists():
                print("ℹ️ Étudiant déjà inscrit à cette évaluation.")
                return Response({"message": "Déjà inscrit à cette évaluation."}, status=status.HTTP_200_OK)

            # Inscription de l’étudiant
            EtudiantEvaluation.objects.create(etudiant=etudiant, evaluation=evaluation)
            print("✅ Inscription réussie")
            eval_data = {
                'duration': evaluation.duration,
                'title': evaluation.title,
                'description': evaluation.description,
                'dateStart': evaluation.date_creation,
                'status': evaluation.status,
                'code': evaluation.access_code,
            }
            return Response({"message": "Inscription réussie à l'évaluation.",'eval_data':eval_data}, status=status.HTTP_200_OK)

        except Evaluation.DoesNotExist:
            print("❌ Évaluation introuvable")
            return Response({"error": f"Évaluation introuvable pour le code : {code}"}, status=status.HTTP_404_NOT_FOUND)

        except Etudiant.DoesNotExist:
            print("❌ Étudiant introuvable")
            return Response({"error": f"Étudiant introuvable pour l'identifiant : {user_id}"}, status=status.HTTP_404_NOT_FOUND)
