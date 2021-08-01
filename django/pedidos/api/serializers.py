from rest_framework import serializers
from django.shortcuts import get_object_or_404
from pedidos.models import Refresco, Cliente, Medida, Ingrediente, Venta, Sandwich

class RefrescoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refresco
        fields = '__all__'

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class MedidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medida
        fields = '__all__'


class IngredienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingrediente
        fields = '__all__'

class SandwichSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sandwich
        fields = '__all__'

    @classmethod
    def serializarPorVenta(cls, venta: Venta):
        sandwiches = Sandwich.objects.filter(venta=venta)
        productos = []
        for sandwich in sandwiches:
            ingredientes = Ingrediente.objects.filter(sandwich=sandwich)
            productos.append({
                'nombre': f'Sandwich {sandwich.medida.nombre}',
                'ingredientes': [ingrediente.nombre for ingrediente in ingredientes]
            })
        return productos

class VentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta
        fields = '__all__'

    @classmethod
    def serializar(cls, venta: Venta):
        return {
            'ref_venta': venta.pk,
            'nombre_cliente': venta.cliente.nombre,
            'apellido_cliente': venta.cliente.apellido,
            'fecha': venta.fecha,
            'total': cls.calcular_monto_total(venta),
            'productos': SandwichSerializer.serializarPorVenta(venta)
        }

    @classmethod
    def serializarPorCliente(cls, cliente: Cliente):
        ventas = Venta.objects.filter(cliente=cliente)
        return {
            'nombre_cliente': cliente.nombre,
            'apellido_cliente': cliente.apellido,
            'precio_total': sum([cls.calcular_monto_total(venta) for venta in ventas]),
            'ventas':
                [
                    {
                        'ref_venta': venta.pk,
                        'fecha': venta.fecha,
                        'cantidad_productos': cls.calcular_cantidad_productos(venta)
                    }
                    for venta in ventas
                ]
        }

    @classmethod
    def calcular_cantidad_productos(cls, venta: Venta):
        return len(Sandwich.objects.filter(venta=venta))

    @classmethod
    def calcular_monto_total(cls, venta: Venta):
        monto = 0
        sandwiches = Sandwich.objects.filter(venta=venta)
        for sandwich in sandwiches:
            monto += sandwich.medida.precio
            ingredientes = Ingrediente.objects.filter(sandwich=sandwich)
            monto += sum([ ingrediente.precio for ingrediente in ingredientes])
        return monto

    @classmethod
    def serializarMedida(cls, medida: Medida):
        ventas = Venta.objects.filter(sandwich__medida=medida)
        datos = []
        for venta in ventas:
            datos.append({
                'fecha': venta.fecha,
                'ref_venta': venta.pk,
                'cantidad': cls.calcular_cantidad_productos(venta=venta),
                'monto': cls.calcular_monto_total(venta=venta)
            })
        return {
            'nombre_medida': medida.nombre,
            'precio_total': sum([venta.get('monto') for venta in datos]),
            'ventas': datos
        }

    @classmethod
    def serializarIngrediente(cls, ingrediente: Ingrediente):
        ventas = Venta.objects.filter(sandwich__ingrediente=ingrediente)
        ingredientes = []
        for venta in ventas:
            ingredientes.append({
                'fecha': venta.fecha,
                'cantidad': cls.calcular_cantidad_productos(venta=venta),
                'monto': ingrediente.precio
            })
        return {
            'nombre_ingrediente': ingrediente.nombre,
            'precio': sum([venta.get('monto') for venta in ventas]),
            'ventas': ingredientes
        }