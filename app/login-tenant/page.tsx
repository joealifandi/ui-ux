'use client';
import { useState } from 'react';
import { Home, ArrowLeft, UserPlus, LogIn } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

export default function LoginTenantPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(mode === 'login' ? 'Login berhasil' : 'Registrasi berhasil, silakan lengkapi pengajuan sewa');
    window.location.href = '/tenant-portal';
  };

  return (
    <main className="min-h-screen bg-[#04150d] text-white flex items-center justify-center px-6 py-20">
      <a href="/" className="absolute top-6 left-6 flex items-center gap-2 text-white/60 hover:text-white"><ArrowLeft className="w-4 h-4" /> Home</a>
      <div className="w-full max-w-md bg-[#082016] border border-white/10 p-8">
        <div className="flex items-center justify-center mb-8">
          <Image src="/NGAWIKOST.png" alt="NGAWIKOST" width={220} height={60} className="h-16 w-auto" priority />
        </div>
        <div className="flex gap-2 mb-8">
          <button onClick={() => setMode('login')} className={`flex-1 py-3 text-sm uppercase tracking-widest border ${mode === 'login' ? 'bg-emerald-600 border-emerald-600' : 'border-white/10 text-white/50'}`}>Login</button>
          <button onClick={() => setMode('register')} className={`flex-1 py-3 text-sm uppercase tracking-widest border ${mode === 'register' ? 'bg-emerald-600 border-emerald-600' : 'border-white/10 text-white/50'}`}>Register</button>
        </div>
        <h1 className="text-3xl font-extrabold mb-2">{mode === 'login' ? 'Portal Penghuni' : 'Daftar Penghuni'}</h1>
        <p className="text-white/50 text-sm mb-8">{mode === 'login' ? 'Masuk untuk cek tagihan, kontrak, dan pembayaran.' : 'Buat akun untuk mengajukan sewa kamar.'}</p>
        <form onSubmit={submit} className="grid gap-4">
          {mode === 'register' && <input required placeholder="Nama Lengkap" className="bg-black/30 border border-white/10 p-4 outline-none focus:border-emerald-500" />}
          <input required type="email" placeholder="Email" className="bg-black/30 border border-white/10 p-4 outline-none focus:border-emerald-500" />
          <input required type="password" placeholder="Password" className="bg-black/30 border border-white/10 p-4 outline-none focus:border-emerald-500" />
          {mode === 'register' && (
            <>
              <input required placeholder="No. HP" className="bg-black/30 border border-white/10 p-4 outline-none focus:border-emerald-500" />
              <input required placeholder="Nomor KTP / Identitas" className="bg-black/30 border border-white/10 p-4 outline-none focus:border-emerald-500" />
            </>
          )}
          <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 py-4 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            {mode === 'login' ? 'Masuk' : 'Daftar'}
          </button>
        </form>
        <a href="/login-admin" className="block text-center text-xs text-white/35 hover:text-emerald-400 mt-8 uppercase tracking-widest">Login Pemilik Kos</a>
      </div>
    </main>
  );
}
