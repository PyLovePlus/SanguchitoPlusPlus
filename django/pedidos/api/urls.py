from django.urls import path
from pedidos.api import views

urlpatterns = [
    path('refrescos/', views.ListaRefrescos.as_view()),
    path('refrescos/<int:pk>', views.DetalleRefresco.as_view()),
    path('clientes/', views.ListaClientes.as_view()),
    path('clientes/<int:pk>', views.DetalleCliente.as_view()),
    path('medidas/', views.ListaMedida.as_view()),
    path('medidas/<int:pk>', views.DetalleMedida.as_view()),
    path('ingredientes/', views.ListaIngrediente.as_view()),
    path('ingredientes/<int:pk>', views.DetalleIngrediente.as_view()),
    path('pedidos/', views.Pedidos.as_view()),
    path('admin/ventas', views.VentasGenerales.as_view()),
    path('admin/ventas/clientes', views.VentasPorCliente.as_view()),
    path('admin/ventas/medidas', views.VentasPorMedida.as_view()),
    path('admin/ventas/ingredientes', views.VentasPorIngrediente.as_view())
]