import joblib
import numpy as np
import json
import os

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

crop_model = joblib.load(os.path.join(BASE_DIR, "models", "crop_model.pkl"))
fert_model = joblib.load(os.path.join(BASE_DIR, "models", "fertilizer_model.pkl"))

le_crop = joblib.load(os.path.join(BASE_DIR, "models", "le_crop.pkl"))
le_soil = joblib.load(os.path.join(BASE_DIR, "models", "le_soil.pkl"))
le_fert = joblib.load(os.path.join(BASE_DIR, "models", "le_fert.pkl"))

le_state = joblib.load(os.path.join(BASE_DIR, "models", "le_state.pkl"))
le_district = joblib.load(os.path.join(BASE_DIR, "models", "le_district.pkl"))
le_season = joblib.load(os.path.join(BASE_DIR, "models", "le_season.pkl"))


def match_value(input_value, encoder):
    input_value = input_value.strip()
    for cls in encoder.classes_:
        if cls.strip().lower() == input_value.lower():
            return cls
    return None


@csrf_exempt
def recommend_crop_fertilizer(request):

    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # ---------- Crop model inputs ----------

            state_input = match_value(data["state"], le_state)
            district_input = match_value(data["district"], le_district)
            season_input = match_value(data["season"], le_season)

            if not state_input:
                return JsonResponse({"error": "Invalid state"})

            if not district_input:
                return JsonResponse({"error": "Invalid district"})

            if not season_input:
                return JsonResponse({"error": "Invalid season"})

            state = le_state.transform([state_input])[0]
            district = le_district.transform([district_input])[0]
            season = le_season.transform([season_input])[0]

            year = int(data["year"])
            area = float(data["area"])


            # ---------- Fertilizer inputs (safe defaults) ----------

            temp = float(data.get("temperature", 25))
            humidity = float(data.get("humidity", 50))
            moisture = float(data.get("moisture", 40))
            nitrogen = float(data.get("nitrogen", 20))
            potassium = float(data.get("potassium", 20))
            phosphorus = float(data.get("phosphorus", 20))

            soil_type = data.get("soil_type", "Loamy")

            soil_match = match_value(soil_type, le_soil)

            if soil_match:
                soil = le_soil.transform([soil_match])[0]
            else:
                soil = 0


            # ---------- Predict crop production ----------

            crops_prediction = []

            for crop_name in le_crop.classes_:

                crop_encoded = le_crop.transform([crop_name])[0]

                production = crop_model.predict(
                    [[state, district, year, season, crop_encoded, area]]
                )[0]

                production = np.expm1(production)

                crops_prediction.append((crop_name, production))


            # ---------- Get Top 3 crops ----------

            top3 = sorted(crops_prediction, key=lambda x: x[1], reverse=True)[:3]

            results = []


            # ---------- Predict fertilizer ----------

            for crop_name, prod in top3:

                crop_match = None

                for c in le_crop.classes_:
                    if c.strip().lower() == crop_name.strip().lower():
                        crop_match = c
                        break

                if crop_match is None:

                    results.append({
                        "crop": crop_name.strip(),
                        "expected_production": round(float(prod), 2),
                        "fertilizer": "No fertilizer data available"
                    })

                    continue


                crop_encoded = le_crop.transform([crop_match])[0]

                fert_pred = fert_model.predict(
                    [[temp, humidity, moisture, soil, crop_encoded, nitrogen, potassium, phosphorus]]
                )[0]

                fertilizer = le_fert.inverse_transform([fert_pred])[0]


                results.append({
                    "crop": crop_name.strip(),
                    "expected_production": round(float(prod), 2),
                    "fertilizer": fertilizer.strip()
                })


            return JsonResponse({"recommendations": results})


        except Exception as e:
            return JsonResponse({"error": str(e)})


    return JsonResponse({"error": "POST request required"})