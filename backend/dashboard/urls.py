from django.urls import path
from .views import create_soil_data

urlpatterns = [
    path("create/", create_soil_data),
]
