from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .serializers import SoilDataSerializer, StateSerializer, DistrictSerializer
from .models import State, District

@api_view(["GET"])
@permission_classes([AllowAny])
def get_all_states(request):
    """Get all available states"""
    states = State.objects.all()
    serializer = StateSerializer(states, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_all_districts(request):
    """Get all districts grouped by state"""
    state_name = request.query_params.get('state', None)
    
    if state_name:
        districts = District.objects.filter(state__name=state_name)
    else:
        districts = District.objects.all()
    
    serializer = DistrictSerializer(districts, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_districts_by_state(request, state_id):
    """Get districts for a specific state"""
    try:
        state = State.objects.get(id=state_id)
        districts = state.districts.all()
        serializer = DistrictSerializer(districts, many=True)
        return Response(serializer.data)
    except State.DoesNotExist:
        return Response({'error': 'State not found'}, status=404)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_soil_data(request):
    serializer = SoilDataSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
