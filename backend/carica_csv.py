import os
import django

# Imposta il modulo delle impostazioni di Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Cambia 'fantacalcio.settings' se il nome del tuo progetto è diverso

# Inizializza Django
django.setup()


import csv
from api.models import Giocatore  # Sostituisci 'myapp' con il nome della tua app

with open("lista_giocatori.csv", newline="", encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile,delimiter=';')

    # Stampa le intestazioni
    print("Intestazioni:", reader.fieldnames)

    # Ora carica i dati
    for row in reader:
        print(row)  # Stampa il contenuto di ogni riga


with open("lista_giocatori.csv", newline="", encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile, delimiter=';')  # Usa il delimitatore ";"
    
    # Stampa tutte le intestazioni
    print("Intestazioni:", reader.fieldnames)

    # Itera sulle righe del CSV
    for row in reader:
        # Stampa le chiavi della riga per verificare
        print(row.keys())  # Aggiungi questa riga per verificare le chiavi effettive

        # Assicurati che la chiave 'ruolo' esista nella riga
        if "ruolo" in row:
            Giocatore.objects.create(
                nome=row["nome"],
                squadra=row["squadra"],
                quotazione=row["quotazione"],
                ruolo=row["ruolo"]
            )
        else:
            print(f"🚨 La colonna 'ruolo' non è presente in questa riga: {row}")

print("✅ Dati caricati con successo!")