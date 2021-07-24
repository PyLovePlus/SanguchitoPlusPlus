from django.db import models

class Refresco(models.Model):
    nombre = models.CharField(max_length=50)
    precio = models.FloatField()
    mililitros = models.IntegerField()

class Cliente(models.Model):
    cedula = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=40)
    apellido = models.CharField(max_length=40)