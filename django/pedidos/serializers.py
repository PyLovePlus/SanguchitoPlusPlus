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