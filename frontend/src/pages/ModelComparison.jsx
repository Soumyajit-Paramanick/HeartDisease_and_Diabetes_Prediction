import { Navbar } from "../components/Navbar";

export default function ModelComparison() {
  const heartModels = [
    ["Gaussian NB", "79.44%", "23.99%", "62.21%", "34.63%"],
    ["Logistic Regression", "73.69%", "21.67%", "76.67%", "33.79%"],
    ["SVM", "71.66%", "20.70%", "79.06%", "32.82%"],
    ["Random Forest", "79.01%", "19.14%", "43.32%", "26.55%"],
    ["KNN", "88.84%", "31.20%", "22.74%", "26.30%"],
    ["Decision Tree", "79.05%", "18.76%", "41.80%", "25.90%"],
  ];

  const diabetesModels = [
    ["Random Forest", "95.78%", "76.84%", "74.76%", "75.79%"],
    ["Decision Tree", "94.79%", "68.79%", "75.00%", "71.76%"],
    ["KNN", "89.60%", "45.06%", "81.54%", "58.04%"],
    ["Logistic Regression", "87.96%", "41.23%", "85.90%", "55.72%"],
    ["SVM", "87.49%", "40.27%", "86.61%", "54.98%"],
    ["Gaussian NB", "86.20%", "37.46%", "84.31%", "51.87%"],
  ];

  const Table = ({ title, data }) => (
    <div className="mb-10">
      <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
        {title}
      </h3>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-center text-gray-200">
          <thead className="bg-[#0b1d35] text-cyan-300">
            <tr>
              <th className="p-3">Model</th>
              <th>Accuracy</th>
              <th>Precision</th>
              <th>Recall</th>
              <th>F1 Score</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                {row.map((cell, idx) => (
                  <td key={idx} className="p-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#07111f]">
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Model <span className="text-cyan-400">Evaluation</span>
        </h2>

        <p className="text-center text-gray-300 mb-10 max-w-3xl mx-auto">
          Comparison of machine learning models based on Accuracy, Precision,
          Recall, and F1 Score for Heart Disease and Diabetes Prediction.
        </p>

        {/* Tables */}
        <Table title="Heart Disease Prediction Models" data={heartModels} />
        <Table title="Diabetes Prediction Models" data={diabetesModels} />

        {/* Conclusion Section */}
        <div className="mt-12 space-y-6">

          {/* Heart Conclusion */}
          <div className="bg-[#0b1d35] p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">
              Heart Disease Conclusion
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Gaussian Naive Bayes is selected as the final model for Heart Disease
              Prediction because it provides the best balance between precision and
              recall with the highest F1 score. Although KNN has higher accuracy,
              its low recall makes it unreliable for detecting actual positive cases.
            </p>
          </div>

          {/* Diabetes Conclusion */}
          <div className="bg-[#0b1d35] p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">
              Diabetes Prediction Conclusion
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Random Forest is selected as the final model for Diabetes Prediction
              as it achieves the highest accuracy and F1 score, indicating strong
              overall performance and a good balance between precision and recall.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}