
import React from 'react';
import { UserProfile } from '../types';

interface UserPortalViewProps {
  user: UserProfile;
}

const UserPortalView: React.FC<UserPortalViewProps> = ({ user }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <div className="lg:col-span-2 bg-[#0f1115] p-10 rounded-[3rem] border border-white/5 glass relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-[2.5rem] blur-xl group-hover:blur-3xl transition-all"></div>
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                className="w-40 h-40 rounded-[2.5rem] border-4 border-white/5 relative z-10 bg-[#05070a]" 
                alt="Profile"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">Premium Recycler</span>
                <span className="text-slate-500 text-[10px] font-bold mono uppercase">Member since {new Date(user.joinedAt).getFullYear()}</span>
              </div>
              <h2 className="text-5xl font-black text-white tracking-tighter mb-4">{user.name}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Points</p>
                  <p className="text-3xl font-black text-emerald-400 tracking-tighter">{user.points.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Bottles Saved</p>
                  <p className="text-3xl font-black text-white tracking-tighter">{user.bottles}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital ID / QR Card */}
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-emerald-500/10 flex flex-col items-center justify-center text-center">
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Personal QR Node</p>
           <div className="w-48 h-48 bg-[#05070a] p-4 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 animate-pulse"></div>
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${user.id}&bgcolor=05070a&color=10b981`} 
                alt="QR Code" 
                className="w-full h-full relative z-10 group-hover:scale-110 transition-transform"
              />
           </div>
           <h4 className="mt-8 text-slate-900 font-black tracking-widest uppercase text-xs">{user.id}</h4>
           <p className="text-slate-400 text-[10px] font-bold mt-2">Scan at any collection bin to earn points</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#0f1115] p-8 rounded-[2.5rem] border border-white/5 glass">
          <h3 className="text-xl font-black text-white mb-6 tracking-tighter">Recent Activities</h3>
          <div className="space-y-4">
            <ActivityItem title="Bottle Deposit" value="+50 pts" time="2h ago" type="plus" />
            <ActivityItem title="Milestone Bonus" value="+200 pts" time="1d ago" type="bonus" />
            <ActivityItem title="Redemption" value="-100 pts" time="3d ago" type="minus" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-500/20 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black tracking-tighter mb-2">Available Rewards</h3>
            <p className="text-indigo-100 text-sm font-medium mb-8">Use your points to claim university vouchers.</p>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 py-4 bg-white text-indigo-600 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-50 transition-colors">Canteen Voucher</button>
            <button className="flex-1 py-4 bg-white/20 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl backdrop-blur-md">Library Pass</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityItem: React.FC<{title: string; value: string; time: string; type: string}> = ({title, value, time, type}) => (
  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
    <div className="flex items-center space-x-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${type === 'plus' ? 'bg-emerald-500/10 text-emerald-500' : type === 'bonus' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-rose-500/10 text-rose-500'}`}>
        <i className={`fas ${type === 'plus' ? 'fa-arrow-up' : type === 'bonus' ? 'fa-star' : 'fa-minus'}`}></i>
      </div>
      <div>
        <p className="text-sm font-black text-white uppercase tracking-wider">{title}</p>
        <p className="text-[10px] text-slate-500 font-bold mono">{time}</p>
      </div>
    </div>
    <span className={`text-sm font-black mono ${type === 'plus' || type === 'bonus' ? 'text-emerald-400' : 'text-rose-500'}`}>{value}</span>
  </div>
);

export default UserPortalView;
