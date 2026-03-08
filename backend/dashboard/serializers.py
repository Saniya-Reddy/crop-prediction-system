from rest_framework import serializers
from .models import SoilData

class SoilDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoilData
        fields = "__all__"
        read_only_fields = ["user"]
