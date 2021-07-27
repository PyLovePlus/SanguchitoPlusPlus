from rest_framework import serializers
from pedidos.models import Refresco, Cliente

class RefrescoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refresco
        fields = '__all__'

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class TamanoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tamano
        fields = '__all__'

class IngredienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingrediente
        fields = '__all__'