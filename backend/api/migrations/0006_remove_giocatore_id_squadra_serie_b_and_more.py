# Generated by Django 5.1.6 on 2025-02-12 15:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_giocatore_id_squadra_serie_a_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='giocatore',
            name='id_squadra_serie_B',
        ),
        migrations.RemoveField(
            model_name='giocatore',
            name='id_squadra_serie_C',
        ),
        migrations.AddField(
            model_name='giocatore',
            name='id_squadra_serie_B',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Seria_B', to='api.squadre_serie_b'),
        ),
        migrations.AddField(
            model_name='giocatore',
            name='id_squadra_serie_C',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Seria_C', to='api.squadre_serie_c'),
        ),
    ]
