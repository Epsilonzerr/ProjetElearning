from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, logout, get_user_model
from django.http import JsonResponse
import logging
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authentication import TokenAuthentication

User = get_user_model()
class LoginAPIView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        
        print("Email:", email)
        print("Password:", password)

        user = authenticate(username=email, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            print(user.id)
            return Response({
                "access_token": str(refresh.access_token),  
                "refresh_token": str(refresh), 
                "user_id": user.id,
                "role": user.role  
            })
        else:
            print("Authentication failed for:", email)
            return Response({"detail": "Email ou mot de passe incorrect."}, status=status.HTTP_401_UNAUTHORIZED)

User = get_user_model()

logger = logging.getLogger(__name__)

class UserDataView(APIView):
    authentication_classes = [JWTAuthentication]  # Ensures JWT token is used
    permission_classes = [IsAuthenticated]  # Ensures the user is authenticated

    def get(self, request, user_id):
        logger.info(f"Received request for user ID: {user_id}")

        # Check token and user authentication
        user = request.user
        logger.info(f"Authenticated user: {user}")

        # If the user is not the same as the requested user, raise a permission error
        if user.id != user_id:
            logger.warning(f"User {user.id} attempted to access user {user_id}'s data")
            return Response({"error": "Forbidden"}, status=403)

        # Assuming you're fetching user data from your model
        user_data = get_object_or_404(User, id=user_id)
        logger.info(f"Returning data for user: {user_data.first_name}")

        return Response({'first_name': user_data.first_name,'last_name':user_data.last_name ,'email': user_data.email,'role':user_data.role})



def user_logout(request):
    logout(request)  
    return JsonResponse({"message": "Déconnexion réussie"})