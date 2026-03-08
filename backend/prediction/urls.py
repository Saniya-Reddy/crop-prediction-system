from django.urls import path
from .views import suggest_best_crop

urlpatterns = [
    path("suggest/", suggest_best_crop, name="suggest_best_crop"),
]
