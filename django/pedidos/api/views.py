from django.shortcuts import render, get_object_or_404
from pedidos.models import Refresco, Cliente, Medida, Ingrediente, Sandwich, Venta
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from django.core.exceptions import ValidationError
from pedidos.api.serializers import RefrescoSerializer, ClienteSerializer, MedidaSerializer, IngredienteSerializer, VentaSerializer

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
        # Obtenemos los datos de la solicitud
        cedula = request.data.get('cedula_cliente')
        datos_productos = request.data.get('productos')
        id_refrescos = request.data.get('refrescos')

        # Buscamos al cliente respectivo o retornamos 404
        cliente = get_object_or_404(Cliente, pk=cedula)

        # Buscamos los refrescos especificados, si alguno no existe retornamos 404
        refrescos = []
        for id in id_refrescos:
            refrescos.append(get_object_or_404(Refresco, pk=id))

        # Generamos los datos de los sandwiches a crear, incluyendo medida e ingredientes
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

        # Creamos la venta y la guardamos
        venta = Venta.objects.create(cliente=cliente)
        venta.save()

        # Agregamos los refrescos seleccionados a la venta
        for refresco in refrescos:
            venta.refrescos.add(refresco)

        # Agregamos los sandwiches a la venta
        for producto in productos:
            sandwich = Sandwich.objects.create(medida=producto.get('medida'), venta=venta)
            sandwich.save()
            for ingrediente in producto.get('ingredientes'):
                sandwich.ingredientes.add(ingrediente)

        return Response(status=status.HTTP_201_CREATED)

class VentasGenerales(APIView):
    def get(self, request: Request, *args, **kwargs):
        if not request.query_params.get('dia'):
            ventas = Venta.objects.all()
        else:
            try:
                ventas = Venta.objects.filter(fecha=request.query_params.get('dia'))
            except ValidationError:
                return Response(data='La fecha especificada es invalida.', status=status.HTTP_400_BAD_REQUEST)

        respuesta = []
        for venta in ventas:
            respuesta.append(VentaSerializer.serializar(venta))
        return Response(data=respuesta, status=status.HTTP_200_OK)

class VentasPorCliente(APIView):
    def get(self, request: Request, *args, **kwargs):
        respuesta = []
        clientes = Cliente.objects.all()
        for cliente in clientes:
            respuesta.append(VentaSerializer.serializarPorCliente(cliente=cliente))
        return Response(data=respuesta, status=status.HTTP_200_OK)

class VentasPorMedida(APIView):
    def get(self, request: Request, *args, **kwargs):
        respuesta = []
        medidas = Medida.objects.all()
        for medida in medidas:
            respuesta.append(MedidaSerializer.serializarMedida(medida=medida))
        return Response(data=respuesta, status=status.HTTP_200_OK)
