from rest_framework import serializers
from pedidos.models import Refresco, Cliente, Medida, Ingrediente

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