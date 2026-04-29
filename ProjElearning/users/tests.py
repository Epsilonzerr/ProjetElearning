from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import User


class UserAuthApiTests(APITestCase):
    def setUp(self):
        self.password = "StrongPass123!"
        self.user = User.objects.create_user(
            username="student@etud.iga.ac.ma",
            email="student@etud.iga.ac.ma",
            password=self.password,
            role="etudiant",
            first_name="Student",
            last_name="User",
        )

    def test_login_returns_tokens_and_role(self):
        response = self.client.post(
            reverse("login"),
            {"email": self.user.username, "password": self.password},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access_token", response.data)
        self.assertIn("refresh_token", response.data)
        self.assertEqual(response.data["user_id"], self.user.id)
        self.assertEqual(response.data["role"], "etudiant")

    def test_user_data_requires_matching_authenticated_user(self):
        other_user = User.objects.create_user(
            username="other@etud.iga.ac.ma",
            email="other@etud.iga.ac.ma",
            password=self.password,
            role="etudiant",
        )
        login_response = self.client.post(
            reverse("login"),
            {"email": self.user.username, "password": self.password},
            format="json",
        )
        token = login_response.data["access_token"]

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(reverse("data", args=[other_user.id]))

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
