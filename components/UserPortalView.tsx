
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface UserPortalViewProps {
  user: UserProfile;
  onUpdate: (updated: Partial<UserProfile>) => void;
}

const UserPortalView: React.FC<UserPortalViewProps> = ({ user, onUpdate }) => {
  const [scanning, setScanning] = useState(false);

  const simulateScan = () => {
    setScanning(true);
    // Mimic IoT bin interaction
    setTimeout(() => {
      onUpdate({
        points: user.points + 50,
        bottles: user.bottles + 1
      });
      setScanning(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="lg:col-span-2 bg-[#0f1115] p-8 rounded-[2.5rem] border border-white/5 glass relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                className="w-32 h-32 rounded-3xl border-2 border-white/5 relative z-10 bg-[#05070a]" 
                alt="Profile"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest">Active Recycler</span>
                <span className="text-slate-500 text-[9px] font-bold mono uppercase">ID: {user.id}</span>
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter mb-4">{user.name}</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#05070a] p-4 rounded-2xl border border-white/5">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">XP Balance</p>
                  <p className="text-2xl font-black text-emerald-400 tracking-tighter">{user.points.toLocaleString()}</p>
                </div>
                <div className="bg-[#05070a] p-4 rounded-2xl border border-white/5">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Impact Units</p>
                  <p className="text-2xl font-black text-white tracking-tighter">{user.bottles}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action / QR Card */}
        <div className="bg-[#0f1115] p-8 rounded-[2.5rem] border border-white/5 glass shadow-2xl flex flex-col items-center justify-center text-center">
           <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-6">Interaction Node</p>
           <div className="w-32 h-32 bg-[#05070a] p-3 rounded-2xl relative overflow-hidden group mb-6">
              <div className="absolute inset-0 bg-emerald-500/5 animate-pulse"></div>
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user.id}&bgcolor=05070a&color=10b981`} 
                alt="QR Code" 
                className="w-full h-full relative z-10 group-hover:scale-105 transition-transform"
              />
           </div>
           
           <button 
            onClick={simulateScan}
            disabled={scanning}
            className={`w-full py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
              scanning ? 'bg-white/5 text-slate-500' : 'bg-emerald-500 text-slate-900 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20'
            }`}
           >
             {scanning ? <><i className="fas fa-spinner fa-spin mr-2"></i> Syncing...</> : 'Simulate Scan'}
           </button>
           <p className="text-slate-600 text-[9px] font-bold mt-4 uppercase tracking-tighter italic">Tap to simulate bottle deposit (Demo Mode)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0f1115] p-6 rounded-[2.5rem] border border-white/5 glass">
          <h3 className="text-lg font-black text-white mb-4 tracking-tighter">Recent Impact Log</h3>
          <div className="space-y-3">
            <ActivityItem title="Bottle Deposit" value="+50 pts" time="Just now" type="plus" />
            <ActivityItem title="System Bonus" value="+200 pts" time="24h ago" type="bonus" />
          </div>
        </div>
        
        {user.prioJonName && (
          <div className="bg-rose-500/5 p-6 rounded-[2.5rem] border border-rose-500/20 glass flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center">
                <i className="fas fa-heart text-rose-500"></i>
              </div>
              <div>
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Priojon Contact</p>
                <p className="text-sm font-black text-white">{user.prioJonName}</p>
                <p className="text-xs text-slate-500 font-bold mono">{user.prioJonContact}</p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">
              <i className="fas fa-phone"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ActivityItem: React.FC<{title: string; value: string; time: string; type: string}> = ({title, value, time, type}) => (
  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
    <div className="flex items-center space-x-4">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${type === 'plus' ? 'bg-emerald-500/10 text-emerald-500' : type === 'bonus' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-rose-500/10 text-rose-500'}`}>
        <i className={`fas ${type === 'plus' ? 'fa-plus' : type === 'bonus' ? 'fa-star' : 'fa-minus'} text-xs`}></i>
      </div>
      <div>
        <p className="text-[10px] font-black text-white uppercase tracking-wider">{title}</p>
        <p className="text-[9px] text-slate-600 font-bold mono uppercase">{time}</p>
      </div>
    </div>
    <span className={`text-xs font-black mono ${type === 'plus' || type === 'bonus' ? 'text-emerald-400' : 'text-rose-500'}`}>{value}</span>
  </div>
);

export default UserPortalView;
