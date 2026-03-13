from django.urls import path
from .views import recommend_crop_fertilizer

urlpatterns = [
    path("recommend/", recommend_crop_fertilizer),
]