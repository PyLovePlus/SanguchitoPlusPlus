from django.urls import path
from pedidos import views

urlpatterns = [
    path('refrescos/', views.ListaRefrescos.as_view()),
    path('refrescos/<int:pk>', views.DetalleRefresco.as_view()),
    path('clientes/', views.ListaClientes.as_view()),
    path('clientes/<int:pk>', views.DetalleCliente.as_view()),
    path('medidas/', views.ListaMedida.as_view()),
    path('medidas/<int:pk>', views.DetalleMedida.as_view()),
    path('ingredientes/', views.ListaIngrediente.as_view()),
    path('ingredientes/<int:pk>', views.DetalleIngrediente.as_view()),
    path('pedidos', views.Pedidos.as_view())
]