from django.urls import path
from .views import create_soil_data, get_all_states, get_all_districts, get_districts_by_state

urlpatterns = [
    path("create/", create_soil_data),
    path("states/", get_all_states, name='all_states'),
    path("districts/", get_all_districts, name='all_districts'),
    path("districts/<int:state_id>/", get_districts_by_state, name='districts_by_state'),
]
