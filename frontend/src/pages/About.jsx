import { Navbar } from '../components/Navbar';

export default function About() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <div className='max-w-4xl mx-auto py-10 px-4'>
        <h2 className='text-3xl font-bold mb-4'>About Project</h2>
        <p>
          This project predicts Diabetes and Heart Disease using Machine Learning.
          Models are trained using preprocessing, SMOTE balancing, standardization,
          and evaluation metrics like Accuracy, Precision, Recall and F1 Score.
        </p>
      </div>
    </div>
  );
}