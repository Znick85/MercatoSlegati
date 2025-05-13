from django.contrib import admin
from .models import Giocatore, squadre_serie_A

class giocatori(admin.ModelAdmin):
    list_display = ('nome','ruolo','quotazione','id_squadra_serie_A',)

class squadre(admin.ModelAdmin):
    list_display = ('nome','cassa','user')

admin.site.register(Giocatore,giocatori)
admin.site.register(squadre_serie_A,squadre)