# Generated by Django 5.1.6 on 2025-02-12 15:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_giocatore_ruolo'),
    ]

    operations = [
        migrations.CreateModel(
            name='squadre_serie_A',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('cassa', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='squadre_serie_B',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('cassa', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='squadre_serie_C',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('cassa', models.IntegerField()),
            ],
        ),
        migrations.RenameField(
            model_name='giocatore',
            old_name='prezzo',
            new_name='quotazione',
        ),
        migrations.AddField(
            model_name='giocatore',
            name='id_squadra_serie_A',
            field=models.ManyToManyField(related_name='Seria_A', to='api.squadre_serie_a'),
        ),
        migrations.AddField(
            model_name='giocatore',
            name='id_squadra_serie_B',
            field=models.ManyToManyField(related_name='Seria_B', to='api.squadre_serie_b'),
        ),
        migrations.AddField(
            model_name='giocatore',
            name='id_squadra_serie_C',
            field=models.ManyToManyField(related_name='Seria_C', to='api.squadre_serie_c'),
        ),
    ]
