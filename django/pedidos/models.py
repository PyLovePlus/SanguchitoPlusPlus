from django.db import models
from django.utils.timezone import now
from datetime import datetime

class Refresco(models.Model):
    def __str__(self):
        return f'#{self.pk} {self.nombre}'

    nombre = models.CharField(max_length=50)
    precio = models.FloatField()
    mililitros = models.IntegerField()

class Cliente(models.Model):
    def __str__(self):
        return f'({self.cedula}) {self.nombre} {self.apellido}'

    cedula = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=40)
    apellido = models.CharField(max_length=40)

class Medida(models.Model):
    def __str__(self):
        return f'#{self.pk} {self.nombre}'

    nombre = models.CharField(max_length=10)
    precio = models.FloatField()

class Ingrediente(models.Model):
    def __str__(self):
        return f'#{self.pk} {self.nombre}'

    nombre = models.CharField(max_length=100)
    precio = models.FloatField()

class Venta(models.Model):
    def __str__(self):
        return f'[#{self.pk} - {self.fecha.strftime("%d/%m/%Y")}] {self.cliente}'

    refrescos = models.ManyToManyField(Refresco)
    fecha = models.DateTimeField(default=now)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)

class Sandwich(models.Model):
    def __str__(self):
        return f'({self.venta}) {self.medida}'
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    medida = models.ForeignKey(Medida, on_delete=models.CASCADE)
    ingredientes = models.ManyToManyField(Ingrediente)