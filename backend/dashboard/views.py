from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import SoilDataSerializer

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_soil_data(request):
    serializer = SoilDataSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
