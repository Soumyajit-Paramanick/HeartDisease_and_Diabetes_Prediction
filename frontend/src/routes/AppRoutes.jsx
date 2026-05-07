import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AuthPage from '../pages/AuthPage';
import DiabetesPrediction from '../pages/DiabetesPrediction';
import HeartPrediction from '../pages/HeartPrediction';
import ModelComparison from '../pages/ModelComparison';
import About from '../pages/About';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/diabetes' element={<DiabetesPrediction />} />
      <Route path='/heart' element={<HeartPrediction />} />
      <Route path='/models' element={<ModelComparison />} />
      <Route path='/about' element={<About />} />
    </Routes>
  );
}