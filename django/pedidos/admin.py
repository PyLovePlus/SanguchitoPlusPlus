from django.contrib import admin
from pedidos.models import Cliente, Medida, Sandwich, Venta, Ingrediente, Refresco

# Register your models here.
admin.site.register(Cliente)
admin.site.register(Medida)
admin.site.register(Sandwich)
admin.site.register(Venta)
admin.site.register(Ingrediente)
admin.site.register(Refresco)
