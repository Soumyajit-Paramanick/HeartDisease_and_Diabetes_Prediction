// Footer.jsx

export function Footer() {
  return (
    <footer className="bg-[#06101d]/95 border-t border-cyan-400/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8 text-gray-300">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Health<span className="text-cyan-400">Predict</span>
            </h2>
            <p className="text-sm leading-relaxed">
              AI-powered disease prediction platform for Diabetes and Heart
              Disease using Machine Learning models for accurate and fast
              healthcare assistance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer">Home</li>
              <li className="hover:text-cyan-400 cursor-pointer">
                Diabetes Prediction
              </li>
              <li className="hover:text-cyan-400 cursor-pointer">
                Heart Prediction
              </li>
              <li className="hover:text-cyan-400 cursor-pointer">
                Model Evaluation
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">
              Contact
            </h3>
            <p className="text-sm">Email: support@healthpredict.com</p>
            <p className="text-sm">Phone: +91 98765 43210</p>
            <p className="text-sm">Location: India</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-5 text-center text-sm text-gray-400">
          © 2026 HealthPredict. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}