

import { useState } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import config from "../config";

export default function HeartPrediction() {
  const [formData, setFormData] = useState({
    BMI: "",
    Smoking: "No",
    AlcoholDrinking: "No",
    Stroke: "No",
    PhysicalHealth: "",
    MentalHealth: "",
    DiffWalking: "No",
    Sex: "Male",
    AgeCategory: "18-24",
    Race: "White",
    Diabetic: "No",
    PhysicalActivity: "Yes",
    GenHealth: "Good",
    SleepTime: "",
    Asthma: "No",
    KidneyDisease: "No",
    SkinCancer: "No",
  });

  const [result, setResult] = useState("");
  const [probability, setProbability] = useState("");
  const [loading, setLoading] = useState(false);

  const ageOptions = [
    "18-24",
    "25-29",
    "30-34",
    "35-39",
    "40-44",
    "45-49",
    "50-54",
    "55-59",
    "60-64",
    "65-69",
    "70-74",
    "75-79",
    "80 or older",
  ];

  const raceOptions = [
    "White",
    "Black",
    "Asian",
    "American Indian/Alaskan Native",
    "Hispanic",
    "Other",
  ];

  const diabeticOptions = [
    "No",
    "Yes",
    "No, borderline diabetes",
    "Yes (during pregnancy)",
  ];

  const healthOptions = [
    "Excellent",
    "Very good",
    "Good",
    "Fair",
    "Poor",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult("");
    setProbability("");

    try {
      const res = await axios.post(
        `${config.API_BASE_URL}/heart-prediction`,
        formData
      );

      setResult(res.data.prediction);
      setProbability(res.data.probability);
      // console
      console.log(res.data);
    } catch (error) {
      console.log(error);
      setResult("Server Error");
      setProbability("");
    } finally {
      setLoading(false);
    }
  };

  const selectStyle =
    "w-full p-2.5 rounded-lg bg-[#0f223d] border border-cyan-400/20 text-white text-sm outline-none";

  const inputStyle =
    "w-full p-2.5 rounded-lg bg-[#0f223d] border border-cyan-400/20 text-white text-sm outline-none";

  return (
    <div className="min-h-screen bg-[#07111f]">
      <Navbar />

      <div className="bg-gradient-to-br from-[#07111f] via-[#0b1d35] to-[#102a43] min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl">

          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Heart Disease
            <span className="text-cyan-400"> Prediction</span>
          </h1>

          <p className="text-center text-gray-300 mb-6 text-sm">
            Fill all details based on health information to predict heart
            disease risk.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* BMI */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">BMI</label>
              <input
                type="number"
                step="0.1"
                name="BMI"
                value={formData.BMI}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            {/* Smoking */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">Smoking</label>
              <select
                name="Smoking"
                value={formData.Smoking}
                onChange={handleChange}
                className={selectStyle}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Alcohol Drinking */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                Alcohol Drinking
              </label>
              <select
                name="AlcoholDrinking"
                value={formData.AlcoholDrinking}
                onChange={handleChange}
                className={selectStyle}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Stroke */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">Stroke</label>
              <select
                name="Stroke"
                value={formData.Stroke}
                onChange={handleChange}
                className={selectStyle}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Physical Health */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                Physical Health
              </label>
              <input
                type="number"
                name="PhysicalHealth"
                value={formData.PhysicalHealth}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            {/* Mental Health */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                Mental Health
              </label>
              <input
                type="number"
                name="MentalHealth"
                value={formData.MentalHealth}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            {/* Diff Walking */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                Difficulty Walking
              </label>
              <select
                name="DiffWalking"
                value={formData.DiffWalking}
                onChange={handleChange}
                className={selectStyle}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Sex */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">Sex</label>
              <select
                name="Sex"
                value={formData.Sex}
                onChange={handleChange}
                className={selectStyle}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Age Category */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                Age Category
              </label>
              <select
                name="AgeCategory"
                value={formData.AgeCategory}
                onChange={handleChange}
                className={selectStyle}
              >
                {ageOptions.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>

            {/* Race */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">Race</label>
              <select
                name="Race"
                value={formData.Race}
                onChange={handleChange}
                className={selectStyle}
              >
                {raceOptions.map((race) => (
                  <option key={race} value={race}>
                    {race}
                  </option>
                ))}
              </select>
            </div>

            {/* Diabetic */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">Diabetic</label>
              <select
                name="Diabetic"
                value={formData.Diabetic}
                onChange={handleChange}
                className={selectStyle}
              >
                {diabeticOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Physical Activity */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                Physical Activity
              </label>
              <select
                name="PhysicalActivity"
                value={formData.PhysicalActivity}
                onChange={handleChange}
                className={selectStyle}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* General Health */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                General Health
              </label>
              <select
                name="GenHealth"
                value={formData.GenHealth}
                onChange={handleChange}
                className={selectStyle}
              >
                {healthOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Sleep Time */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                Sleep Time
              </label>
              <input
                type="number"
                name="SleepTime"
                value={formData.SleepTime}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            {/* Asthma */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">Asthma</label>
              <select
                name="Asthma"
                value={formData.Asthma}
                onChange={handleChange}
                className={selectStyle}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Kidney Disease */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                Kidney Disease
              </label>
              <select
                name="KidneyDisease"
                value={formData.KidneyDisease}
                onChange={handleChange}
                className={selectStyle}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Skin Cancer */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                Skin Cancer
              </label>
              <select
                name="SkinCancer"
                value={formData.SkinCancer}
                onChange={handleChange}
                className={selectStyle}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3 flex justify-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-10 py-3 rounded-xl shadow-lg transition duration-300 disabled:opacity-70"
              >
                {loading ? "Predicting..." : "Predict Heart Disease"}
              </button>
            </div>
          </form>

          {/* Result Section */}
          {result && (
            <div className="mt-8">
              <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-6 shadow-xl text-center">

                <h2 className="text-2xl font-bold text-white mb-4">
                  Prediction Result
                </h2>

                <div
                  className={`inline-block px-8 py-4 rounded-xl text-xl font-bold shadow-md ${
                    result === "Yes"
                      ? "bg-red-500/20 text-red-300 border border-red-400/30"
                      : result === "No"
                      ? "bg-green-500/20 text-green-300 border border-green-400/30"
                      : "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                  }`}
                >
                  {result === "Yes"
                    ? "⚠ High Risk of Heart Disease Detected"
                    : result === "No"
                    ? "✅ No Significant Heart Disease Risk Detected"
                    : "⚠ Server Response Error"}
                </div>

                {probability !== "" && (
                  <div className="mt-5">
                    <p className="text-cyan-300 text-lg font-semibold">
                      Prediction Confidence
                    </p>

                    <p className="text-white text-2xl font-bold mt-1">
                      {(probability * 100).toFixed(2)}%
                    </p>
                  </div>
                )}

                <p className="text-gray-300 text-sm md:text-base mt-5 leading-relaxed px-4">
                  {result === "Yes"
                    ? "Based on the provided health information, the model predicts a possible risk of heart disease. It is strongly recommended to consult a healthcare professional for further medical evaluation and diagnosis."
                    : result === "No"
                    ? "Based on the provided health information, the model predicts a lower risk of heart disease. However, maintaining a healthy lifestyle and regular health checkups is always recommended."
                    : "Unable to process prediction properly. Please verify backend connection and ensure the Flask server is running correctly."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}