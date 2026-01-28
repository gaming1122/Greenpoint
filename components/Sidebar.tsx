
import React from 'react';
import { ViewType, UserRole } from '../types';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onLogout: () => void;
  role: UserRole;
  userName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, onLogout, role, userName }) => {
  const adminItems = [
    { id: ViewType.DASHBOARD, icon: 'fa-chart-pie', label: 'Monitor', desc: 'System status' },
    { id: ViewType.USER_MANAGEMENT, icon: 'fa-user-group', label: 'Directory', desc: 'Manage nodes' },
    { id: ViewType.IOT_FIRMWARE, icon: 'fa-code-branch', label: 'Hardware', desc: 'IoT logic' },
    { id: ViewType.SYSTEM_LOGS, icon: 'fa-terminal', label: 'Console', desc: 'Cloud stream' },
  ];

  const userItems = [
    { id: ViewType.MY_PROFILE, icon: 'fa-wallet', label: 'Wallet', desc: 'Point balance' },
    { id: ViewType.AI_INSIGHTS, icon: 'fa-wand-magic-sparkles', label: 'AI Eco', desc: 'Analysis' },
  ];

  const commonItems = [
    { id: ViewType.LEADERBOARD, icon: 'fa-ranking-star', label: 'Ranking', desc: 'Top contributors' },
    { id: ViewType.SETTINGS, icon: 'fa-sliders', label: 'Config', desc: 'Preferences' },
  ];

  const activeItems = role === 'ADMIN' ? [...adminItems, ...commonItems] : [...userItems, ...commonItems];
  const themeColor = role === 'ADMIN' ? 'text-indigo-400' : 'text-emerald-500';
  const activeBg = role === 'ADMIN' ? 'bg-indigo-600' : 'bg-emerald-500';
  const activeText = role === 'ADMIN' ? 'text-white' : 'text-slate-900';

  return (
    <aside className="w-20 md:w-64 bg-[#0a0c10] border-r border-white/5 flex flex-col transition-all duration-300 relative z-20">
      <div className="p-6 mb-4">
        <div className="flex items-center space-x-3">
          <div className={`${activeBg} w-10 h-10 rounded-xl flex items-center justify-center shadow-lg`}>
            <i className={`fas ${role === 'ADMIN' ? 'fa-shield-check' : 'fa-seedling'} ${role === 'ADMIN' ? 'text-white' : 'text-slate-900'} text-lg`}></i>
          </div>
          <div className="hidden md:block">
            <h2 className="text-lg font-black text-white tracking-tighter leading-none">GP-<span className={themeColor}>{role}</span></h2>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto scrollbar-hide">
        {activeItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeView === item.id 
                ? `${activeBg} ${activeText} shadow-lg shadow-emerald-500/10` 
                : 'hover:bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${activeView === item.id ? 'bg-black/10' : 'bg-white/5'}`}>
              <i className={`fas ${item.icon} text-sm`}></i>
            </div>
            <div className="hidden md:block text-left">
              <span className="block font-bold text-xs uppercase tracking-wider">{item.label}</span>
              <span className="text-[9px] font-medium opacity-50 block mt-0.5">{item.desc}</span>
            </div>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center md:justify-start space-x-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all font-bold text-xs uppercase tracking-wider"
        >
          <i className="fas fa-sign-out-alt text-sm"></i>
          <span className="hidden md:block">Disconnect</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
