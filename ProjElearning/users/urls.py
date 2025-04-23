from django.urls import path
from .views import LoginAPIView, UserDataView, user_logout
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('login/', LoginAPIView.as_view(), name='login'),
    path('data/<int:user_id>/', UserDataView.as_view(), name='data'),
    path('logout/', user_logout, name='logout'),
]
