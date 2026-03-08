import joblib
import numpy as np
import json
import os

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model and encoders
model = joblib.load(os.path.join(BASE_DIR, "crop_model.pkl"))
le_state = joblib.load(os.path.join(BASE_DIR, "le_state.pkl"))
le_district = joblib.load(os.path.join(BASE_DIR, "le_district.pkl"))
le_season = joblib.load(os.path.join(BASE_DIR, "le_season.pkl"))
le_crop = joblib.load(os.path.join(BASE_DIR, "le_crop.pkl"))


# Helper function to match value even if dataset has trailing spaces
def match_value(input_value, encoder):
    input_value = input_value.strip()
    for cls in encoder.classes_:
        if cls.strip() == input_value:
            return cls
    return None


@csrf_exempt
def suggest_best_crop(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # Extract inputs
            state_raw = data.get("state", "")
            district_raw = data.get("district", "")
            season_raw = data.get("season", "")
            year = int(data.get("year", 0))
            area = float(data.get("area", 0))

            # Match values safely (handles trailing spaces)
            state_input = match_value(state_raw, le_state)
            district_input = match_value(district_raw, le_district)
            season_input = match_value(season_raw, le_season)

            # Validation
            if not state_input:
                return JsonResponse({
                    "error": f"Invalid state. Available: {[s.strip() for s in le_state.classes_]}"
                })

            if not district_input:
                return JsonResponse({
                    "error": f"Invalid district. Available: {[d.strip() for d in le_district.classes_]}"
                })

            if not season_input:
                return JsonResponse({
                    "error": f"Invalid season. Available: {[s.strip() for s in le_season.classes_]}"
                })

            # Encode
            state = le_state.transform([state_input])[0]
            district = le_district.transform([district_input])[0]
            season = le_season.transform([season_input])[0]

            best_crop = None
            best_production = 0

            # Loop through all crops to find best
            for crop_name in le_crop.classes_:
                crop_encoded = le_crop.transform([crop_name])[0]

                prediction = model.predict(
                    [[state, district, year, season, crop_encoded, area]]
                )

                prediction = np.expm1(prediction)[0]  # reverse log

                if prediction > best_production:
                    best_production = prediction
                    best_crop = crop_name.strip()

            return JsonResponse({
                "best_crop": best_crop,
                "expected_production": round(float(best_production), 2)
            })

        except Exception as e:
            return JsonResponse({"error": str(e)})

    return JsonResponse({"error": "Only POST method allowed"})