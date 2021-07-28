from django.shortcuts import render, get_object_or_404
from pedidos.models import Refresco, Cliente, Medida, Ingrediente, Sandwich, Venta
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
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

class Pedidos(APIView):
    def post(self, request: Request):
        cedula = request.data.get('cedula')
        datos_productos = request.data.get('productos')
        id_refrescos = request.data.get('refrescos')

        cliente = get_object_or_404(Cliente, pk=cedula)

        refrescos = []
        for id in id_refrescos:
            refrescos.append(get_object_or_404(Refresco, pk=id))

        productos = []
        for datos in datos_productos:
            if not datos.get('id_medida'):
                return Response(data='El sandwich debe contener obligatoriamente una medida.', status=status.HTTP_400_BAD_REQUEST)
            if not datos.get('ingredientes'):
                return Response(data='El sandwich debe contener como minimo 1 ingrediente.', status=status.HTTP_400_BAD_REQUEST)

            medida = get_object_or_404(Medida, pk=datos.get('id_medida'))

            ingredientes = []
            for ingrediente in datos.get('ingredientes'):
                ingredientes.append(get_object_or_404(Ingrediente, pk=ingrediente))

            productos.append({ "medida": medida, "ingredientes": ingredientes })

        venta = Venta.objects.create(cliente=cliente)
        venta.save()
        for refresco in refrescos:
            venta.refrescos.add(refresco)

        for producto in productos:
            sandwich = Sandwich.objects.create(medida=producto.get('medida'), venta=venta)
            sandwich.save()
            for ingrediente in producto.get('ingredientes'):
                sandwich.ingredientes.add(ingrediente)

        return Response(status=status.HTTP_200_OK)

