from rest_framework import serializers
from .models import SoilData, State, District

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ['id', 'name']


class DistrictSerializer(serializers.ModelSerializer):
    state = StateSerializer(read_only=True)
    state_name = serializers.CharField(source='state.name', read_only=True)
    
    class Meta:
        model = District
        fields = ['id', 'name', 'state', 'state_name']


class SoilDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoilData
        fields = "__all__"
        read_only_fields = ["user"]
