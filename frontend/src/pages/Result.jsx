
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ShieldCheck,
  TrendingUp,
  Zap,
  Bookmark,
  Share2,
  Download,
} from "lucide-react";

/* Nutrient progress bar */
const NutrientBar = ({ label, value = 0, color }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs font-medium text-slate-500">
      <span>{label}</span>
      <span>{value}</span>
    </div>

    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full ${color}`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  </div>
);

/* Simple Map Preview */
const MapMock = ({ latitude = 0, longitude = 0 }) => (
  <div className="w-full h-56 bg-slate-100 rounded-xl flex items-center justify-center border">
    <p className="text-sm text-slate-600">
      Location preview ({latitude.toFixed(4)}, {longitude.toFixed(4)})
    </p>
  </div>
);

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const result = state?.result;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">No Result Found</h2>
          <p className="text-slate-500 mb-4">
            Please run a new crop analysis.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const crop = result.best_crop || result.crop || "Unknown Crop";
  const expectedProduction =
    result.expected_production || result.production || null;

  const soil = result.soil || {};
  const location = result.location || {};

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 bg-white border rounded"
            >
              <ChevronLeft size={20} />
            </button>

            <div>
              <h1 className="text-2xl font-bold">
                Crop Intelligence Report
              </h1>

              <p className="text-sm text-slate-500">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
            <ShieldCheck size={14} />
            Verified
          </span>
        </div>

        {/* Crop Card */}
        <div className="bg-white p-6 rounded-2xl shadow mb-6">

          <div className="flex justify-between items-center flex-wrap gap-4">

            <div>
              <div className="text-xs font-bold text-green-600 uppercase">
                Recommended Crop
              </div>

              <h2 className="text-3xl font-black">{crop}</h2>

              <div className="flex gap-4 mt-2 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <TrendingUp size={16} /> High Yield
                </span>

                <span className="flex items-center gap-1">
                  <Zap size={16} /> Low Pest Risk
                </span>
              </div>
            </div>

            {expectedProduction && (
              <div className="text-right">
                <div className="text-sm text-slate-500">
                  Expected Production
                </div>
                <div className="text-2xl font-bold">
                  {expectedProduction}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">

            {/* Soil Profile */}
            <div className="bg-white p-6 rounded-xl shadow">

              <div className="flex justify-between mb-4">
                <h3 className="font-bold">Soil Profile</h3>

                <span className="text-sm text-slate-500">
                  pH {soil.ph ?? "-"}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4">

                <NutrientBar
                  label="Nitrogen"
                  value={soil.n ?? 0}
                  color="bg-green-400"
                />

                <NutrientBar
                  label="Phosphorus"
                  value={soil.p ?? 0}
                  color="bg-yellow-400"
                />

                <NutrientBar
                  label="Potassium"
                  value={soil.k ?? 0}
                  color="bg-blue-400"
                />

              </div>

            </div>

            {/* Market Card */}
            <div className="bg-white p-6 rounded-xl shadow">

              <h3 className="font-bold mb-2">Market Analysis</h3>

              <p className="text-sm text-slate-500">
                Expected market demand for {crop}.
              </p>

              <div className="mt-4 h-28 bg-slate-100 rounded flex items-center justify-center text-slate-400">
                Market price trend chart
              </div>

            </div>

          </div>

          {/* Right Section */}
          <div className="space-y-6">

            <div className="bg-white p-6 rounded-xl shadow">
              <h4 className="font-bold mb-2">Cultivation Cycle</h4>

              <p className="text-sm text-slate-600">
                Sowing: March – April  
                <br />
                Harvest: September – October
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">

              <h4 className="font-bold mb-2">Location Reference</h4>

              <MapMock
                latitude={location.latitude ?? 0}
                longitude={location.longitude ?? 0}
              />

            </div>

          </div>

        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-white p-3 rounded-xl shadow flex justify-between">

          <div className="flex gap-2">

            <button className="flex items-center gap-2 px-3 py-2 border rounded">
              <Bookmark size={16} /> Save
            </button>

            <button className="flex items-center gap-2 px-3 py-2 border rounded">
              <Share2 size={16} /> Share
            </button>

          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded">
            <Download size={16} /> Report
          </button>

        </div>

      </div>
    </div>
  );
}

