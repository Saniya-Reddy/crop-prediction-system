
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

  const resetForm = () => {
    setForm({
      state: "",
      district: "",
      season: "",
      year: new Date().getFullYear(),
      area: 1.0,
    });
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
      setError(
        err?.response?.data?.error ||
        err?.message ||
        "Prediction failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">

      {/* Header */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-700">
          🌾 AI Crop Recommendation
        </h1>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-xl font-semibold mb-6">
          Enter Farm Details
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* State */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              State
            </label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="e.g Maharashtra"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              District
            </label>
            <input
              name="district"
              value={form.district}
              onChange={handleChange}
              placeholder="e.g Nagpur"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Season */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Season
            </label>

            <select
              name="season"
              value={form.season}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Season</option>
              <option value="Kharif">Kharif</option>
              <option value="Rabi">Rabi</option>
              <option value="Summer">Summer</option>
              <option value="Winter">Winter</option>
              <option value="Autumn">Autumn</option>
              <option value="Whole Year">Whole Year</option>
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Year
            </label>
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Area (hectares)
            </label>
            <input
              type="number"
              name="area"
              value={form.area}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-between items-center mt-4">

            {error && (
              <p className="text-red-600 text-sm">
                {error}
              </p>
            )}

            <div className="flex gap-3 ml-auto">

              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {loading ? "Predicting..." : "Suggest Crop"}
              </button>

            </div>
          </div>

        </form>
      </div>

      {/* Info Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 mt-8">

        <div className="bg-white p-4 rounded-lg shadow">
          🌱 <span className="font-semibold">AI Prediction</span>
          <p className="text-sm text-gray-500">
            Machine learning based crop recommendation
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          🌧 <span className="font-semibold">Season Analysis</span>
          <p className="text-sm text-gray-500">
            Suggest crops according to seasonal patterns
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          📈 <span className="font-semibold">Yield Optimization</span>
          <p className="text-sm text-gray-500">
            Helps farmers maximize productivity
          </p>
        </div>

      </div>

    </div>
  );
}

