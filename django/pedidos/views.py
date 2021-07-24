from django.shortcuts import render
from pedidos.models import Refresco, Cliente
from rest_framework import generics
from pedidos.serializers import RefrescoSerializer, ClienteSerializer

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
