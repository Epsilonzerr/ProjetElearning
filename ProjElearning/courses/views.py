from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import Etudiant, Professeur

from .models import EtudiantEvaluation, Evaluation


def serialize_evaluation(evaluation):
    return {
        "duration": evaluation.duration,
        "title": evaluation.title,
        "description": evaluation.description,
        "dateStart": evaluation.date_creation,
        "status": evaluation.status,
        "code": evaluation.access_code,
    }


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_evaluations(request, user_id):
    if request.user.id != user_id:
        return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

    etudiant_evaluations = EtudiantEvaluation.objects.filter(
        etudiant__user_id=user_id
    ).select_related("evaluation")

    if not etudiant_evaluations.exists():
        return JsonResponse({"error": "No evaluations available for this user"}, status=404)

    active = []
    completed = []

    for etudiant_evaluation in etudiant_evaluations:
        evaluation = etudiant_evaluation.evaluation
        serialized = serialize_evaluation(evaluation)

        if evaluation.status == "active":
            active.append(serialized)
        elif evaluation.status == "completed":
            completed.append(serialized)

    return JsonResponse({"active": active, "completed": completed})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_professor_evaluations(request, user_id):
    if request.user.id != user_id:
        return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

    try:
        professeur = Professeur.objects.get(user__id=user_id)
    except Professeur.DoesNotExist:
        return JsonResponse({"error": "Professor not found for this user"}, status=404)

    evaluations = Evaluation.objects.filter(professeur=professeur).order_by("-date_creation")

    items = []
    for evaluation in evaluations:
        student_count = EtudiantEvaluation.objects.filter(evaluation=evaluation).count()
        items.append(
            {
                **serialize_evaluation(evaluation),
                "id": evaluation.id,
                "status": evaluation.status,
                "students": student_count,
                "ponderation": evaluation.ponderation,
            }
        )

    return JsonResponse({"items": items})


class JoinEvaluationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        code = request.data.get("code")
        user_id = request.data.get("userId")

        if not code or not user_id:
            return Response(
                {"error": "Code et userId sont requis."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            evaluation = Evaluation.objects.get(access_code=code)
        except Evaluation.DoesNotExist:
            return Response(
                {"error": f"Évaluation introuvable pour le code : {code}"},
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            etudiant = Etudiant.objects.get(user__id=user_id)
        except Etudiant.DoesNotExist:
            return Response(
                {"error": f"Étudiant introuvable pour l'identifiant : {user_id}"},
                status=status.HTTP_404_NOT_FOUND,
            )

        eval_data = serialize_evaluation(evaluation)

        if EtudiantEvaluation.objects.filter(etudiant=etudiant, evaluation=evaluation).exists():
            return Response(
                {
                    "message": "Déjà inscrit à cette évaluation.",
                    "eval_data": eval_data,
                },
                status=status.HTTP_200_OK,
            )

        EtudiantEvaluation.objects.create(etudiant=etudiant, evaluation=evaluation)
        return Response(
            {
                "message": "Inscription réussie à l'évaluation.",
                "eval_data": eval_data,
            },
            status=status.HTTP_200_OK,
        )
