import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useGoogleLoginBtn } from '../context/GoogleLoginContext';

const LoginPage = () => {
  const { user } = useAuth();
  const { triggerLogin } = useGoogleLoginBtn();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -bottom-20 -right-20"></div>

      <div className="w-full max-w-md p-10 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] text-center shadow-2xl z-10">
        <div className="mb-8">
          <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Access Mainframe</h2>
          <p className="text-slate-400 mt-2 text-sm font-medium">Identify yourself to continue to NeonArch.</p>
        </div>
        
        <div className="flex justify-center">
          <button 
            className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-white/5"
            onClick={triggerLogin}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800">
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
            Authorized Architect Access Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;