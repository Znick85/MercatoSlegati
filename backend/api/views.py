from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.urls import path
from .models import Giocatore, squadre_serie_A
from .serializers import GiocatoreSerializer, squadreSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, permissions
from django.contrib.auth.models import User


class GiocatoreViewSet(viewsets.ModelViewSet):
    queryset = Giocatore.objects.all()
    serializer_class = GiocatoreSerializer


class squadreViewSet(viewsets.ModelViewSet):
    queryset = squadre_serie_A.objects.all()
    serializer_class = squadreSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):  # 🔹 Permette solo GET
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["id"] = self.user.id  # Aggiungi il nome utente alla risposta
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer