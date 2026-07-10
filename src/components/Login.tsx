import React, { useState } from 'react';
import { 
  Lock, User, Eye, EyeOff, AlertCircle, LogIn, Check
} from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (user: {
    name: string;
    id: string;
    role: 'mahasiswa' | 'dosen' | 'admin';
    email?: string;
    nim?: string;
  }) => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const students = [
    { name: 'John Tosh', nim: '2254100011', password: '2254100011123' },
    { name: 'Fatima', nim: '225410016', password: '225410016123' },
    { name: 'Adi', nim: '225410028', password: '225410028123' },
    { name: 'Adinda', nim: '225410073', password: '225410073123' },
  ];

  const staff = [
    { name: 'Nafisya (Moderator)', email: 'nafisya@unpad.ac.id', password: 'dosen2024', role: 'dosen' as const },
    { name: 'Administrator', email: 'admin@unpad.ac.id', password: 'admin2024', role: 'admin' as const },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedIdentity = identity.trim();
    if (!trimmedIdentity || !password) {
      setError('Harap isi username dan password Anda.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // First, check if identity matches any student NIM
      const studentFound = students.find(
        (s) => s.nim === trimmedIdentity && s.password === password
      );

      if (studentFound) {
        setIsSuccess(true);
        setTimeout(() => {
          onLoginSuccess({
            name: studentFound.name,
            id: studentFound.nim,
            role: 'mahasiswa',
            nim: studentFound.nim,
          });
        }, 1000);
        return;
      }

      // Second, check if identity matches any staff Email
      const staffFound = staff.find(
        (st) => st.email.toLowerCase() === trimmedIdentity.toLowerCase() && st.password === password
      );

      if (staffFound) {
        setIsSuccess(true);
        setTimeout(() => {
          onLoginSuccess({
            name: staffFound.name,
            id: staffFound.email,
            role: staffFound.role,
            email: staffFound.email,
          });
        }, 1000);
        return;
      }

      // If no match found
      setError('Username atau password salah. Silakan coba lagi.');
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div id="login-container" className="flex min-h-screen w-full font-sans bg-white overflow-hidden animate-fade-in">
      
      {/* LEFT PANEL: Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 sm:p-12 md:p-16 relative z-10 bg-white">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-md">
            AI
          </div>
          <span className="text-slate-900 font-black text-lg tracking-tight">Aksara IQ</span>
        </div>

        {/* Main Content Area */}
        <div className="w-full max-w-md mx-auto my-auto py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
              Welcome Back
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Silakan masuk untuk mengakses Academic Digital Twin platform Anda.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            {/* Identity input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={16} />
                </span>
                <input 
                  type="text"
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  placeholder="Masukkan NIM atau email institusi Anda"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800/10 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </span>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800/10 transition-all font-medium"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot options */}
            <div className="flex items-center justify-between mt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-500 font-semibold hover:text-slate-700 transition-colors">
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-md border-slate-300 text-slate-900 focus:ring-slate-800 cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="font-bold text-slate-800 hover:text-slate-950 transition-colors">
                Lupa Password?
              </a>
            </div>

            {/* Error alerts */}
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-700 text-xs px-4 py-3 rounded-xl flex items-center gap-2 animate-pulse mt-1">
                <AlertCircle size={15} className="shrink-0 text-rose-500" />
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {/* Submit CTA Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full text-white font-bold text-sm py-3 px-4 rounded-xl mt-3 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer active:scale-[0.98] ${
                isSuccess 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : 'bg-slate-900 hover:bg-slate-800'
              } ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
            >
              <LogIn size={16} />
              <span className="flex items-center gap-1.5">
                {isSuccess && <Check size={16} />}
                {isSuccess 
                  ? 'Berhasil Masuk' 
                  : isLoading 
                    ? 'Memverifikasi...' 
                    : 'Login'
                }
              </span>
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400 font-semibold">
          <span>Universitas Padjadjaran · FIKOM MANKOM</span>
          <span>Aksara IQ v2.4.1</span>
        </div>
      </div>

      {/* RIGHT PANEL: Decorative Image Card with Premium Organic Asymmetry */}
      <div className="hidden lg:flex lg:w-[55%] p-6 items-center justify-center bg-slate-50 h-screen relative">
        <div 
          className="w-full h-full relative overflow-hidden shadow-2xl transition-all duration-500 group flex flex-col justify-end p-12 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop')",
            borderRadius: '120px 24px 120px 24px' // Unique organic geometric framing matching the design reference image perfectly
          }}
        >
          {/* Glass Overlay with Soft Color Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-slate-900/20 mix-blend-multiply"></div>
          
          {/* Futuristic Network Mesh overlay effect */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

          {/* Glowing blurred blobs inside the container */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Floating glassmorphic card with information */}
          <div className="relative z-10 text-white max-w-xl mb-12">
            <h2 className="text-3xl xl:text-4xl font-extrabold leading-tight mb-4 tracking-tight drop-shadow-sm">
              Browse smart insights of student, curriculum, and assessments.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              Representasi cerdas mahasiswa, visualisasi kurikulum terpadu, serta analisis kompetensi berbasis AI yang memetakan masa depan akademik mahasiswa secara dinamis.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
