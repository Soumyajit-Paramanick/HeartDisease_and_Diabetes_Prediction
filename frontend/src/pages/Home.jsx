
// import { Link } from "react-router-dom";
// import { Navbar } from "../components/Navbar";
// import { Footer } from "../components/Footer";

// export default function Home() {
//   return (
//     <div
//       className="min-h-screen bg-cover bg-center"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80')",
//       }}
//     >
//       <div className="min-h-screen bg-gradient-to-br from-[#07111f]/95 via-[#0b1d35]/90 to-[#102a43]/95">
//         <Navbar />

//         <div className="min-h-[90vh] flex items-center justify-center px-6">
//           <div className="text-center text-white max-w-4xl">
//             <p className="inline-block px-4 py-2 mb-6 text-sm rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
//               AI Powered Healthcare Solution
//             </p>

//             <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
//               Disease Prediction <br />
//               <span className="text-cyan-400">System</span>
//             </h1>

//             <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
//               Predict Diabetes and Heart Disease using advanced Machine Learning
//               models with fast, reliable, and accurate results.
//             </p>

//             <div className="flex flex-wrap justify-center gap-5">
//               <Link
//                 to="/diabetes"
//                 className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-7 py-3 rounded-xl shadow-lg transition duration-300"
//               >
//                 Diabetes Prediction
//               </Link>

//               <Link
//                 to="/heart"
//                 className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-7 py-3 rounded-xl shadow-lg transition duration-300"
//               >
//                 Heart Disease Prediction
//               </Link>

//               <Link
//                 to="/models"
//                 className="bg-purple-500 hover:bg-purple-400 text-black font-semibold px-7 py-3 rounded-xl shadow-lg transition duration-300"
//               >
//                 Model Evaluation
//               </Link>
//             </div>
//           </div>
//         </div>

//         <Footer />
//       </div>
//     </div>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProtectedRoute = (path) => {
    if (!user) {
      alert("Please login first to access this feature.");
      navigate("/auth");
      return;
    }

    navigate(path);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-[#07111f]/95 via-[#0b1d35]/90 to-[#102a43]/95">
        <Navbar />

        <div className="min-h-[90vh] flex items-center justify-center px-6">
          <div className="text-center text-white max-w-4xl">
            <p className="inline-block px-4 py-2 mb-6 text-sm rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
              AI Powered Healthcare Solution
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Disease Prediction <br />
              <span className="text-cyan-400">
                System
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
              Predict Diabetes and Heart Disease
              using advanced Machine Learning
              models with fast, reliable, and
              accurate results.
            </p>

            <div className="flex flex-wrap justify-center gap-5">

              <button
                onClick={() =>
                  handleProtectedRoute("/diabetes")
                }
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-7 py-3 rounded-xl shadow-lg transition duration-300"
              >
                Diabetes Prediction
              </button>

              <button
                onClick={() =>
                  handleProtectedRoute("/heart")
                }
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-7 py-3 rounded-xl shadow-lg transition duration-300"
              >
                Heart Disease Prediction
              </button>

              <button
                onClick={() =>
                  handleProtectedRoute("/models")
                }
                className="bg-purple-500 hover:bg-purple-400 text-black font-semibold px-7 py-3 rounded-xl shadow-lg transition duration-300"
              >
                Model Evaluation
              </button>

            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}