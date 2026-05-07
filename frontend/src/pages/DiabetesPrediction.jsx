// DiabetesPrediction.jsx

import { useState } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import config from "../config";

export default function DiabetesPrediction() {
  const [formData, setFormData] = useState({
    gender: "Female",
    age: "",
    hypertension: "0",
    heart_disease: "0",
    smoking_history: "never",
    bmi: "",
    HbA1c_level: "",
    blood_glucose_level: "",
  });

  const [result, setResult] = useState("");
  const [probability, setProbability] = useState("");
  const [loading, setLoading] = useState(false);

  const genderOptions = [
    "Female",
    "Male",
    "Other",
  ];

  const smokingOptions = [
    "never",
    "No Info",
    "current",
    "former",
    "ever",
    "not current",
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
        `${config.API_BASE_URL}/api/diabetes-prediction`,
        formData
      );

      setResult(res.data.prediction);
      setProbability(res.data.probability);

      console.log(res.data);
    } catch (error) {
      console.log(error);
      setResult("Server Error");
      setProbability("");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full p-2.5 rounded-lg bg-[#0f223d] border border-cyan-400/20 text-white text-sm outline-none";

  const selectStyle =
    "w-full p-2.5 rounded-lg bg-[#0f223d] border border-cyan-400/20 text-white text-sm outline-none";

  return (
    <div className="min-h-screen bg-[#07111f]">
      <Navbar />

      <div className="bg-gradient-to-br from-[#07111f] via-[#0b1d35] to-[#102a43] min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl">

          {/* Heading */}
          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Diabetes
            <span className="text-cyan-400"> Prediction</span>
          </h1>

          <p className="text-center text-gray-300 mb-6 text-sm">
            Fill patient health details based on dataset values to predict
            diabetes risk using Machine Learning.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* 1 Gender */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={selectStyle}
              >
                {genderOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* 2 Age */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                Age
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={inputStyle}
                placeholder="e.g. 45"
                required
              />
            </div>

            {/* 3 Hypertension */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                Hypertension
              </label>
              <select
                name="hypertension"
                value={formData.hypertension}
                onChange={handleChange}
                className={selectStyle}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            {/* 4 Heart Disease */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                Heart Disease
              </label>
              <select
                name="heart_disease"
                value={formData.heart_disease}
                onChange={handleChange}
                className={selectStyle}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            {/* 5 Smoking History */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                Smoking History
              </label>
              <select
                name="smoking_history"
                value={formData.smoking_history}
                onChange={handleChange}
                className={selectStyle}
              >
                {smokingOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* 6 BMI */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                BMI
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="bmi"
                value={formData.bmi}
                onChange={handleChange}
                className={inputStyle}
                placeholder="e.g. 27.5"
                required
              />
            </div>

            {/* 7 HbA1c Level */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                HbA1c Level
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                name="HbA1c_level"
                value={formData.HbA1c_level}
                onChange={handleChange}
                className={inputStyle}
                placeholder="e.g. 6.5"
                required
              />
            </div>

            {/* 8 Blood Glucose Level */}
            <div>
              <label className="text-gray-200 block mb-1 text-sm">
                Blood Glucose Level
              </label>
              <input
                type="number"
                min="0"
                name="blood_glucose_level"
                value={formData.blood_glucose_level}
                onChange={handleChange}
                className={inputStyle}
                placeholder="e.g. 140"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3 flex justify-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-10 py-3 rounded-xl shadow-lg transition duration-300 disabled:opacity-70"
              >
                {loading ? "Predicting..." : "Predict Diabetes"}
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
                    ? "⚠ High Risk of Diabetes Detected"
                    : result === "No"
                    ? "✅ No Significant Diabetes Risk Detected"
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
                    ? "Based on the provided medical values, the model predicts a possible risk of diabetes. It is recommended to consult a healthcare professional for further diagnosis and medical evaluation."
                    : result === "No"
                    ? "Based on the provided medical values, the model predicts a lower risk of diabetes. Maintaining a healthy lifestyle and regular health checkups is still strongly recommended."
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