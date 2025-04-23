from django.urls import path
from .views import *

urlpatterns = [
    path('evaluations/<int:user_id>/', get_evaluations),
    path('evaluations/join-assessment/', JoinEvaluationView.as_view()),

]
