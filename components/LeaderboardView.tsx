
import React, { useMemo } from 'react';
import { UserProfile } from '../types';

const LeaderboardView: React.FC = () => {
  const users = useMemo(() => {
    const rawUsers = JSON.parse(localStorage.getItem('gp_users') || '{}');
    const userList: UserProfile[] = Object.values(rawUsers).map((u: any) => u.profile);
    
    // Sort by points descending
    return userList.sort((a, b) => b.points - a.points);
  }, []);

  return (
    <div className="bg-[#0f1115] rounded-[2.5rem] border border-white/5 overflow-hidden glass shadow-2xl animate-in fade-in duration-500">
      <div className="p-8 border-b border-white/5 flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-white tracking-tighter">Global Ranking</h3>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mono mt-1">Real-time contribution data</p>
        </div>
        <div className="bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{users.length} Registered Nodes</span>
        </div>
      </div>
      
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full">
          <thead>
            <tr className="text-left text-[10px] font-black text-slate-600 uppercase tracking-widest mono border-b border-white/5">
              <th className="px-8 py-6">Rank</th>
              <th className="px-8 py-6">Contributor</th>
              <th className="px-8 py-6">Bottles</th>
              <th className="px-8 py-6">Points</th>
              <th className="px-8 py-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.length > 0 ? users.map((user, index) => (
              <tr key={user.id} className="group hover:bg-white/5 transition-colors">
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-inner ${
                    index === 0 ? 'bg-amber-400 text-amber-950 shadow-amber-300/50' : 
                    index === 1 ? 'bg-slate-300 text-slate-900' : 
                    index === 2 ? 'bg-orange-400 text-orange-950' : 'bg-white/5 text-slate-500'
                  }`}>
                    {index + 1}
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="" className="w-12 h-12 rounded-xl border border-white/10 bg-[#05070a]" />
                    <div>
                      <div className="text-sm font-black text-white">{user.name}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <span className="text-sm font-black text-slate-300 mono">{user.bottles} Units</span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-lg text-xs font-black mono border border-emerald-500/20">
                    {user.points.toLocaleString()} XP
                  </span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                  <i className="fas fa-users-slash text-4xl text-slate-800 mb-4 block"></i>
                  <p className="text-slate-500 font-black uppercase tracking-widest text-xs">No active nodes detected in registry</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {users.length > 0 && (
        <div className="p-6 bg-white/5 text-center border-t border-white/5">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mono">End of encrypted ranking stream</p>
        </div>
      )}
    </div>
  );
};

export default LeaderboardView;
