import { useState } from 'react';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl'>
      <h2 className='text-3xl font-bold mb-6 text-center'>
        {isLogin ? 'Login' : 'Register'}
      </h2>

      {!isLogin && (
        <input
          className='w-full border p-3 rounded-lg mb-4'
          placeholder='Full Name'
        />
      )}

      <input
        className='w-full border p-3 rounded-lg mb-4'
        placeholder='Email'
      />

      <input
        type='password'
        className='w-full border p-3 rounded-lg mb-4'
        placeholder='Password'
      />

      <button className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold'>
        {isLogin ? 'Login' : 'Register'}
      </button>

      <p className='text-center mt-4'>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className='text-blue-600 font-semibold'
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}