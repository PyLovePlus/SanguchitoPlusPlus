from django.urls import path
from pedidos import views

urlpatterns = [
    path('refrescos/', views.ListaRefrescos.as_view()),
    path('refrescos/<int:pk>', views.DetalleRefresco.as_view()),
    path('clientes/', views.ListaClientes.as_view()),
    path('clientes/<int:pk>', views.DetalleCliente.as_view())
]