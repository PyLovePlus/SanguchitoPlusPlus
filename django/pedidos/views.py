from django.shortcuts import render
from pedidos.models import Refresco, Cliente, Medida, Ingrediente
from rest_framework import generics
from pedidos.serializers import RefrescoSerializer, ClienteSerializer, MedidaSerializer, IngredienteSerializer

# Create your views here.
class ListaRefrescos(generics.ListCreateAPIView):
    queryset = Refresco.objects.all()
    serializer_class = RefrescoSerializer

class DetalleRefresco(generics.RetrieveUpdateDestroyAPIView):
    queryset = Refresco.objects.all()
    serializer_class = RefrescoSerializer

class ListaClientes(generics.ListCreateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class DetalleCliente(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ListaMedida(generics.ListCreateAPIView):
    queryset = Medida.objects.all()
    serializer_class = MedidaSerializer

class DetalleMedida(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medida.objects.all()
    serializer_class = MedidaSerializer

class ListaIngrediente(generics.ListCreateAPIView):
    queryset = Ingrediente.objects.all()
    serializer_class = IngredienteSerializer

class DetalleIngrediente(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingrediente.objects.all()
    serializer_class = IngredienteSerializer
