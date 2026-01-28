
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface SettingsViewProps {
  user: UserProfile;
  onUpdate: (updated: Partial<UserProfile>) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    prioJonName: user.prioJonName || '',
    prioJonContact: user.prioJonContact || ''
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in slide-in-from-right-10 duration-500">
      <section className="bg-[#0f1115] p-10 rounded-[3rem] border border-white/5 glass shadow-2xl">
        <div className="flex items-center space-x-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <i className="fas fa-sliders text-emerald-500"></i>
          </div>
          <div>
            <h3 className="text-2xl font-black text-white tracking-tighter">Node Configuration</h3>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mono">Personalize your identity & safety</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center">
                <i className="fas fa-id-card mr-2 text-emerald-500"></i> Identity
              </h4>
              <div>
                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 ml-1">Visible Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#05070a] border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-emerald-500/50 text-white font-bold"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center">
                <i className="fas fa-heart mr-2 text-rose-500"></i> Priojon (Emergency/Fav)
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 ml-1">Contact Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Mother, Best Friend"
                    value={formData.prioJonName} 
                    onChange={e => setFormData({...formData, prioJonName: e.target.value})}
                    className="w-full bg-[#05070a] border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-emerald-500/50 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 ml-1">Contact Details</label>
                  <input 
                    type="text" 
                    placeholder="Mobile number or Email"
                    value={formData.prioJonContact} 
                    onChange={e => setFormData({...formData, prioJonContact: e.target.value})}
                    className="w-full bg-[#05070a] border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-emerald-500/50 text-white font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-white/5">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter italic">Changes take effect across the entire GreenPoints network instantly.</p>
            <button 
              type="submit"
              className={`px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${
                saved ? 'bg-indigo-500 text-white' : 'bg-emerald-500 text-slate-900 hover:scale-105 active:scale-95'
              }`}
            >
              {saved ? 'Data Synced ✓' : 'Save Config'}
            </button>
          </div>
        </form>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 bg-[#0f1115] border border-white/5 rounded-[2.5rem] glass">
          <h4 className="text-white font-black uppercase tracking-tighter mb-4">Security Protocol</h4>
          <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6">
            Your data is encrypted using AES-256 before being synced to the cloud nodes. Only authorized managers can view your ecological metrics.
          </p>
          <button className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline">Reset Identity Keys</button>
        </div>
        <div className="p-8 bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] glass">
          <h4 className="text-indigo-400 font-black uppercase tracking-tighter mb-4">Support Hub</h4>
          <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6">
            Encountering hardware malfunctions at a bin? Report the Node ID immediately to the central administration.
          </p>
          <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:underline">Open Support Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
