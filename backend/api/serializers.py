from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Giocatore, squadre_serie_A

class GiocatoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Giocatore
        fields = '__all__'  # Include tutti i campi del modello

class squadreSerializer(serializers.ModelSerializer):
    class Meta:
        model = squadre_serie_A
        fields = '__all__'  # Include tutti i campi del modello

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username'] 