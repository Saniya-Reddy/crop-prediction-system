import React from "react";
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

const NutrientBar = ({ label, value, color }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs font-medium text-slate-500">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  </div>
);

const MapMock = ({ latitude = 0, longitude = 0 }) => (
  <div className="relative w-full h-56 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
    <div className="text-sm text-slate-600">Map preview ({latitude.toFixed(4)}, {longitude.toFixed(4)})</div>
  </div>
);

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">No result available</h2>
          <p className="mb-4 text-slate-600">Run a new analysis from the dashboard.</p>
          <button onClick={() => navigate('/dashboard')} className="px-4 py-2 bg-green-600 text-white rounded">Go to Dashboard</button>
        </div>
      </div>
    );
  }

  // support backend response { best_crop, expected_production }
  const backendCrop = result.best_crop || result.crop || "-";
  const expectedProduction = result.expected_production || result.production || null;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="p-2 rounded bg-white border"><ChevronLeft /></button>
            <div>
              <h1 className="text-2xl font-bold">Crop Intelligence Report</h1>
              <p className="text-sm text-slate-500">Generated on {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1"><ShieldCheck /> Verified</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-green-600 uppercase">Optimal Selection</div>
              <h2 className="text-3xl font-black">{result.crop || backendCrop}</h2>
              <div className="flex gap-4 mt-2 text-sm text-slate-600">
                <div className="flex items-center gap-2"><TrendingUp /> High Yield</div>
                <div className="flex items-center gap-2"><Zap /> Low Pest Risk</div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-black">{backendCrop}</div>
              <div className="text-xs text-slate-500">Suggested Crop</div>
              {expectedProduction != null && (
                <div className="mt-2 text-sm text-slate-600">Expected production: {expectedProduction}</div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Detailed Soil Profile</h3>
                <div className="text-sm text-slate-500">pH {result.soil?.ph ?? '-'}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <NutrientBar label="Nitrogen" value={result.soil?.n ?? 0} color="bg-green-400" />
                <NutrientBar label="Phosphorus" value={result.soil?.p ?? 0} color="bg-amber-400" />
                <NutrientBar label="Potassium" value={result.soil?.k ?? 0} color="bg-blue-400" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold mb-2">Market Analysis</h3>
              <p className="text-sm text-slate-500">Projected market performance for {result.crop || backendCrop}.</p>
              <div className="mt-4 h-28 bg-slate-50 rounded flex items-center justify-center text-slate-400">Price trend chart</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h4 className="font-bold mb-2">Cultivation Cycle</h4>
              <div className="text-sm text-slate-600">Sowing: March-April · Harvest: Sept-Oct</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h4 className="font-bold mb-2">Geographic Reference</h4>
              <MapMock latitude={result.location?.latitude ?? 0} longitude={result.location?.longitude ?? 0} />
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-white p-3 rounded-xl shadow flex items-center justify-between">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded border"><Bookmark /> Save</button>
            <button className="flex items-center gap-2 px-3 py-2 rounded border"><Share2 /> Share</button>
          </div>
          <button className="px-4 py-2 rounded bg-slate-900 text-white flex items-center gap-2"><Download /> Report</button>
        </div>
      </div>
    </div>
  );
}
