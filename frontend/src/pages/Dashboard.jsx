import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { suggestBestCrop } from "../api/prediction";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [form, setForm] = useState({
    state: "",
    district: "",
    season: "",
    year: new Date().getFullYear(),
    area: 1.0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        state: form.state,
        district: form.district,
        season: form.season,
        year: Number(form.year),
        area: Number(form.area),
      };

      const result = await suggestBestCrop(payload);
      navigate("/result", { state: { result } });
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || "Suggestion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="px-3 py-1 rounded bg-red-50 text-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Suggest Best Crop</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">State</label>
              <input name="state" value={form.state} onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g. Maharashtra" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">District</label>
              <input name="district" value={form.district} onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g. Nagpur" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Season</label>
              <input name="season" value={form.season} onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g. Kharif" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Year</label>
              <input name="year" value={form.year} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Area (hectares)</label>
              <input name="area" value={form.area} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>

            <div className="md:col-span-2 flex items-center justify-between mt-4">
              {error && <div className="text-sm text-red-600">{error}</div>}
              <div className="flex gap-2 ml-auto">
                <button type="button" onClick={() => setForm({ state: "", district: "", season: "", year: new Date().getFullYear(), area: 1.0 })} className="px-3 py-2 rounded border">Reset</button>
                <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-green-600 text-white">
                  {loading ? "Running..." : "Suggest Crop"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
