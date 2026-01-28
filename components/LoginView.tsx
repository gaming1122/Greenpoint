
import React, { useState, useEffect } from 'react';
import { UserRole, UserProfile } from '../types';

interface LoginViewProps {
  onLoginSuccess: (user: UserProfile) => void;
}

type AuthMode = 'LOGIN' | 'SIGNUP';

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('LOGIN');
  const [role, setRole] = useState<UserRole>('USER');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError('');
  }, [mode, role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const dbKey = role === 'ADMIN' ? 'gp_admins' : 'gp_users';
      const accounts = JSON.parse(localStorage.getItem(dbKey) || '{}');

      if (mode === 'SIGNUP') {
        if (accounts[id]) {
          setError(`Conflict: ${id} is already registered.`);
          setLoading(false);
          return;
        }
        
        const newUser: UserProfile = {
          id,
          name,
          role,
          points: 0,
          bottles: 0,
          joinedAt: new Date().toISOString()
        };

        accounts[id] = { password, profile: newUser };
        localStorage.setItem(dbKey, JSON.stringify(accounts));
        onLoginSuccess(newUser);
      } else {
        // Handle Default Admin
        if (role === 'ADMIN' && id === 'admin' && password === 'password123') {
           onLoginSuccess({ id: 'ADM-001', name: 'System Admin', role: 'ADMIN', points: 0, bottles: 0, joinedAt: '' });
           return;
        }

        const userRecord = accounts[id];
        if (userRecord && userRecord.password === password) {
          onLoginSuccess(userRecord.profile);
        } else {
          setError('Authentication failure: Credentials mismatch.');
          setLoading(false);
        }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070a] p-4 relative overflow-hidden font-sans">
      <div className={`absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] animate-pulse transition-colors duration-1000 ${role === 'ADMIN' ? 'bg-indigo-500/10' : 'bg-emerald-500/10'}`}></div>
      
      <div className="w-full max-w-lg bg-[#0f1115] rounded-[3.5rem] shadow-2xl overflow-hidden relative z-10 p-10 md:p-14 border border-white/5 glass">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-[1.75rem] shadow-2xl mb-6 rotate-3 transition-colors duration-500 ${role === 'ADMIN' ? 'bg-indigo-500 text-white shadow-indigo-500/20' : 'bg-emerald-500 text-slate-900 shadow-emerald-500/20'}`}>
            <i className={`fas ${role === 'ADMIN' ? 'fa-user-shield' : 'fa-leaf'} text-3xl`}></i>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter mb-2">GreenPoints <span className={role === 'ADMIN' ? 'text-indigo-400' : 'text-emerald-400'}>Core</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px] mono">{role} Access Portal</p>
        </div>

        <div className="flex bg-[#05070a] p-1.5 rounded-2xl border border-white/5 mb-6">
          <button onClick={() => setRole('USER')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'USER' ? 'bg-emerald-500 text-slate-900' : 'text-slate-500 hover:text-white'}`}>Student</button>
          <button onClick={() => setRole('ADMIN')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'ADMIN' ? 'bg-indigo-500 text-white' : 'text-slate-500 hover:text-white'}`}>Manager</button>
        </div>

        <div className="flex bg-[#05070a] p-1 rounded-xl border border-white/5 mb-8">
          <button onClick={() => setMode('LOGIN')} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'LOGIN' ? 'text-white' : 'text-slate-600'}`}>Login</button>
          <button onClick={() => setMode('SIGNUP')} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${mode === 'SIGNUP' ? 'text-white' : 'text-slate-600'}`}>Signup</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'SIGNUP' && (
            <div>
              <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Full Identity</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="w-full bg-[#05070a] border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-emerald-500/50 text-white font-bold" required />
            </div>
          )}
          <div>
            <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Unique Identifier</label>
            <input type="text" value={id} onChange={e => setId(e.target.value)} placeholder={role === 'USER' ? "Student ID" : "Admin ID"} className="w-full bg-[#05070a] border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-emerald-500/50 text-white font-bold" required />
          </div>
          <div>
            <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Security Hash</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#05070a] border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-emerald-500/50 text-white font-bold" required />
          </div>

          {error && <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-xl text-[10px] font-black uppercase text-center animate-shake">{error}</div>}

          <button type="submit" disabled={loading} className={`w-full py-5 rounded-2xl font-black tracking-widest uppercase text-xs shadow-xl transition-all active:scale-95 ${role === 'ADMIN' ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900'}`}>
            {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : mode === 'LOGIN' ? 'Authorize Session' : 'Create Identity'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
