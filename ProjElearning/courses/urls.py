from django.urls import path
from .views import *

urlpatterns = [
    path('evaluations/<int:user_id>/', get_evaluations),
    path('professor/evaluations/<int:user_id>/', get_professor_evaluations),
    path('professor/evaluations/', ProfessorEvaluationCreateView.as_view()),
    path('evaluations/join-assessment/', JoinEvaluationView.as_view()),

]
