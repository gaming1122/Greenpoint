
import React from 'react';

const users = [
  { id: 'GP-001', name: 'Zian Ahmed', major: 'C.S.E', points: 4500, status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zian' },
  { id: 'GP-002', name: 'Nusaiba Rahman', major: 'E.E.E', points: 3800, status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nusaiba' },
  { id: 'GP-003', name: 'Imran Khan', major: 'Architecture', points: 2900, status: 'Pending', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Imran' },
  { id: 'GP-004', name: 'Sumaiya Akter', major: 'B.B.A', points: 5100, status: 'Banned', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sumaiya' },
];

const UserManagementView: React.FC = () => {
  return (
    <div className="space-y-10 animate-in slide-in-from-right-10 duration-700">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-end">
        <div className="w-full md:w-96 relative group">
          <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors"></i>
          <input 
            type="text" 
            placeholder="Search by ID or Name..." 
            className="w-full bg-[#0f1115] border border-white/5 rounded-3xl py-4 pl-14 pr-6 text-sm font-bold focus:outline-none focus:border-emerald-500/50 glass transition-all"
          />
        </div>
        <div className="flex space-x-4">
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-widest rounded-3xl border border-white/5 transition-all">Filter</button>
          <button className="px-8 py-4 bg-emerald-500 text-slate-900 font-black text-xs uppercase tracking-widest rounded-3xl shadow-[0_20px_40px_rgba(16,185,129,0.2)] hover:scale-105 active:scale-95 transition-all">Add Student</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <div className="bg-[#0f1115] rounded-[3rem] border border-white/5 glass p-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-2xl font-black text-white tracking-tighter">Registration Queue</h3>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mono">Awaiting Approval: 14</span>
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
            {[1, 2, 3].map(i => (
              <tr key={i} className="group hover:bg-white/5 transition-colors">
                <td className="py-6 px-4 mono text-xs text-emerald-500 font-bold">NODE_USER_{i}09</td>
                <td className="py-6 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10"></div>
                    <div>
                      <div className="text-sm font-black text-white">External_Inbound_{i}</div>
                      <div className="text-[10px] text-slate-500 font-bold">edu.portal.oauth</div>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-4">
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase rounded-lg border border-indigo-500/20">Awaiting Auth</span>
                </td>
                <td className="py-6 px-4 text-slate-500 text-[10px] font-bold uppercase mono">2024-03-2{i} 14:00</td>
                <td className="py-6 px-4 text-right">
                  <button className="w-8 h-8 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-slate-900 transition-all text-slate-500 border border-white/5"><i className="fas fa-check"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UserCard: React.FC<{user: any}> = ({user}) => (
  <div className="bg-[#0f1115] rounded-[2.5rem] border border-white/5 p-8 glass relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
    <div className="absolute top-0 right-0 p-8">
       <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
         user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
         user.status === 'Banned' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
         'bg-orange-500/10 text-orange-500 border-orange-500/20'
       }`}>
         {user.status}
       </span>
    </div>
    
    <div className="flex flex-col items-center text-center mt-4">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
        <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-[2rem] border-4 border-white/5 relative z-10 bg-[#05070a] group-hover:scale-105 transition-transform" />
      </div>
      <h4 className="text-xl font-black text-white tracking-tighter mb-1">{user.name}</h4>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-8 mono">{user.id} / {user.major}</p>
      
      <div className="w-full grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#05070a] p-4 rounded-2xl border border-white/5">
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Balance</p>
          <p className="text-lg font-black text-emerald-500 tracking-tighter">{user.points}</p>
        </div>
        <div className="bg-[#05070a] p-4 rounded-2xl border border-white/5">
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Rank</p>
          <p className="text-lg font-black text-white tracking-tighter">#12</p>
        </div>
      </div>
      
      <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl transition-all border border-white/5">View History</button>
    </div>
  </div>
);

export default UserManagementView;
