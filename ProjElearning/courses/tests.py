from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from courses.models import EtudiantEvaluation, Evaluation
from users.models import Etudiant, Professeur, User


class CourseApiTests(APITestCase):
    def setUp(self):
        self.password = "StrongPass123!"

        self.student_user = User.objects.create_user(
            username="student@etud.iga.ac.ma",
            email="student@etud.iga.ac.ma",
            password=self.password,
            role="etudiant",
        )
        self.professor_user = User.objects.create_user(
            username="prof@iga.ac.ma",
            email="prof@iga.ac.ma",
            password=self.password,
            role="professeur",
        )

        self.student = Etudiant.objects.create(user=self.student_user)
        self.professor = Professeur.objects.create(user=self.professor_user)

        self.evaluation = Evaluation.objects.create(
            title="Java Final",
            description="Final Java assessment",
            ponderation=40,
            access_code="JAVA2026",
            duration=90,
            status="active",
            professeur=self.professor,
        )

    def authenticate(self, username):
        response = self.client.post(
            reverse("login"),
            {"email": username, "password": self.password},
            format="json",
        )
        token = response.data["access_token"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def test_join_assessment_creates_student_evaluation(self):
        self.authenticate(self.student_user.username)

        response = self.client.post(
            "/courses/evaluations/join-assessment/",
            {"userId": self.student_user.id, "code": self.evaluation.access_code},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(
            EtudiantEvaluation.objects.filter(
                etudiant=self.student,
                evaluation=self.evaluation,
            ).exists()
        )
        self.assertEqual(response.data["eval_data"]["code"], self.evaluation.access_code)

    def test_student_evaluations_are_protected_by_authenticated_user(self):
        other_user = User.objects.create_user(
            username="other@etud.iga.ac.ma",
            email="other@etud.iga.ac.ma",
            password=self.password,
            role="etudiant",
        )
        Etudiant.objects.create(user=other_user)
        EtudiantEvaluation.objects.create(etudiant=self.student, evaluation=self.evaluation)

        self.authenticate(other_user.username)
        response = self.client.get(f"/courses/evaluations/{self.student_user.id}/")

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_professor_can_list_own_evaluations(self):
        self.authenticate(self.professor_user.username)

        response = self.client.get(f"/courses/professor/evaluations/{self.professor_user.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()["items"]), 1)
        self.assertEqual(response.json()["items"][0]["code"], self.evaluation.access_code)

    def test_professor_can_create_evaluation_with_questions(self):
        self.authenticate(self.professor_user.username)

        response = self.client.post(
            "/courses/professor/evaluations/",
            {
                "title": "New assessment",
                "description": "Created from API",
                "duration": 75,
                "status": "pending",
                "questions": [
                    {
                        "type": "multiple-choice",
                        "text": "What is Java?",
                        "points": 2,
                        "options": ["A language", "A database"],
                    },
                    {
                        "type": "short-answer",
                        "text": "Define OOP",
                        "points": 3,
                        "answer": "Object oriented programming",
                    },
                ],
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Evaluation.objects.filter(title="New assessment").exists())
