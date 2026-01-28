
import React, { useMemo, useState } from 'react';
import { UserProfile } from '../types';

const UserManagementView: React.FC = () => {
  const [search, setSearch] = useState('');

  const usersList = useMemo(() => {
    try {
      const rawUsers = JSON.parse(localStorage.getItem('gp_users') || '{}');
      return Object.values(rawUsers).map((u: any) => u.profile as UserProfile);
    } catch (e) {
      console.error("Failed to load user list", e);
      return [];
    }
  }, []);

  const filteredUsers = usersList.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in slide-in-from-right-10 duration-700">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-end">
        <div className="w-full md:w-96 relative group">
          <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors"></i>
          <input 
            type="text" 
            placeholder="Search by ID or Name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0f1115] border border-white/5 rounded-3xl py-4 pl-14 pr-6 text-sm font-bold focus:outline-none focus:border-emerald-500/50 glass transition-all"
          />
        </div>
        <div className="flex space-x-4">
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-widest rounded-3xl border border-white/5 transition-all">Filter</button>
          <button className="px-8 py-4 bg-emerald-500 text-slate-900 font-black text-xs uppercase tracking-widest rounded-3xl shadow-[0_20px_40px_rgba(16,185,129,0.2)] hover:scale-105 active:scale-95 transition-all">Add Student</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredUsers.length > 0 ? filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        )) : (
          <div className="col-span-full py-20 bg-[#0f1115] rounded-[3rem] border border-white/5 glass text-center">
             <i className="fas fa-users-slash text-4xl text-slate-800 mb-4 block"></i>
             <p className="text-slate-500 font-black uppercase tracking-widest text-xs">No active nodes found matching search</p>
          </div>
        )}
      </div>

      <div className="bg-[#0f1115] rounded-[3rem] border border-white/5 glass p-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-2xl font-black text-white tracking-tighter">Registration Queue</h3>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mono">Real-time Stream</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-[10px] font-black text-slate-600 uppercase tracking-widest mono border-b border-white/5">
              <th className="pb-6 px-4">Entity ID</th>
              <th className="pb-6 px-4">Identification</th>
              <th className="pb-6 px-4">Protocol</th>
              <th className="pb-6 px-4">Timeline</th>
              <th className="pb-6 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {usersList.slice(0, 3).map((user, i) => (
              <tr key={user.id} className="group hover:bg-white/5 transition-colors">
                <td className="py-6 px-4 mono text-xs text-emerald-500 font-bold">{user.id}</td>
                <td className="py-6 px-4">
                  <div className="flex items-center space-x-3">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10" />
                    <div>
                      <div className="text-sm font-black text-white">{user.name}</div>
                      <div className="text-[10px] text-slate-500 font-bold">Inbound Auth</div>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-4">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded-lg border border-emerald-500/20">Authorized</span>
                </td>
                <td className="py-6 px-4 text-slate-500 text-[10px] font-bold uppercase mono">{user.joinedAt?.split('T')[0] || 'N/A'}</td>
                <td className="py-6 px-4 text-right">
                  <button className="w-8 h-8 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-500 transition-all text-slate-500 border border-white/5"><i className="fas fa-trash-alt"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UserCard: React.FC<{user: UserProfile}> = ({user}) => (
  <div className="bg-[#0f1115] rounded-[2.5rem] border border-white/5 p-8 glass relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
    <div className="absolute top-0 right-0 p-8">
       <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
         Active
       </span>
    </div>
    
    <div className="flex flex-col items-center text-center mt-4">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} className="w-24 h-24 rounded-[2rem] border-4 border-white/5 relative z-10 bg-[#05070a] group-hover:scale-105 transition-transform" />
      </div>
      <h4 className="text-xl font-black text-white tracking-tighter mb-1">{user.name}</h4>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-8 mono">{user.id}</p>
      
      <div className="w-full grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#05070a] p-4 rounded-2xl border border-white/5">
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Balance</p>
          <p className="text-lg font-black text-emerald-500 tracking-tighter">{user.points}</p>
        </div>
        <div className="bg-[#05070a] p-4 rounded-2xl border border-white/5">
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Impact</p>
          <p className="text-lg font-black text-white tracking-tighter">{user.bottles}</p>
        </div>
      </div>
      
      <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl transition-all border border-white/5">View History</button>
    </div>
  </div>
);

export default UserManagementView;
