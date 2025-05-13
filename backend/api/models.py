from django.db import models
from django.conf import settings 
from django.db.models import JSONField

class squadre_serie_A(models.Model): 
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Usa il modello utente configurato (default: User)
        blank=True,
        null=True,
        on_delete=models.SET_NULL,  # Cosa fare se l'utente viene eliminato
        related_name='squadre_serie_a', # Nome per l'accesso inverso dall'utente alle squadre
        verbose_name='Utente',      # Nome visualizzato nell'admin (in italiano se preferisci)
    )
    nome = models.CharField(
        max_length=100,
        verbose_name='Nome squadra',)
    cassa = models.IntegerField()
    mercato = JSONField(default=list)

    def __str__(self):
        return self.nome
    
class squadre_serie_B(models.Model):
    
    nome = models.CharField(max_length=100)
    cassa = models.IntegerField()
    
    def __str__(self):
        return self.nome

class squadre_serie_C(models.Model):
   
    nome = models.CharField(max_length=100)
    cassa = models.IntegerField()
    
    
    def __str__(self):
        return self.nome

class Giocatore(models.Model):
    PORTIERE = 'Portiere'
    DIFENSORE = 'Difensore'
    CENTROCAMPISTA = 'Centrocampista'
    ATTACANTE = 'Attaccante'

    SCELTE_OPZIONI = [
        (PORTIERE,'Portiere'),
        (DIFENSORE,'Difensore'),
        (CENTROCAMPISTA,'Centrocampista'),
        (ATTACANTE,'Attaccante'),
    ]


    nome = models.CharField(max_length=100)
    ruolo = models.CharField(
        max_length=20,  # Imposta una lunghezza massima appropriata
        choices=SCELTE_OPZIONI,        
    )
    squadra = models.CharField(max_length=50)
    quotazione = models.IntegerField()
    id_squadra_serie_A = models.ForeignKey(squadre_serie_A,related_name='Seria_A',blank=True,null=True, on_delete=models.SET_NULL)
    id_squadra_serie_B = models.ForeignKey(squadre_serie_B,related_name='Seria_B',blank=True,null=True, on_delete=models.SET_NULL)
    id_squadra_serie_C = models.ForeignKey(squadre_serie_C,related_name='Seria_C',blank=True,null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.nome
