
import React, { useState, useEffect } from 'react';
import { ViewType, UserRole, UserProfile } from './types';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import LeaderboardView from './components/LeaderboardView';
import IotSpecView from './components/IotSpecView';
import BackendSpecView from './components/BackendSpecView';
import AiInsights from './components/AiInsights';
import LoginView from './components/LoginView';
import UserManagementView from './components/UserManagementView';
import SystemLogsView from './components/SystemLogsView';
import UserPortalView from './components/UserPortalView';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('gp_active_session');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('gp_active_session', JSON.stringify(user));
    // Default view based on role
    setActiveView(user.role === 'ADMIN' ? ViewType.DASHBOARD : ViewType.MY_PROFILE);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('gp_active_session');
  };

  if (!currentUser) {
    return <LoginView onLoginSuccess={handleLogin} />;
  }

  const renderView = () => {
    // Shared views
    if (activeView === ViewType.AI_INSIGHTS) return <AiInsights />;
    if (activeView === ViewType.LEADERBOARD) return <LeaderboardView />;

    // Role-specific views
    if (currentUser.role === 'USER') {
      switch (activeView) {
        case ViewType.MY_PROFILE: return <UserPortalView user={currentUser} />;
        default: return <UserPortalView user={currentUser} />;
      }
    } else {
      switch (activeView) {
        case ViewType.DASHBOARD: return <DashboardView />;
        case ViewType.IOT_FIRMWARE: return <IotSpecView />;
        case ViewType.BACKEND_SPECS: return <BackendSpecView />;
        case ViewType.USER_MANAGEMENT: return <UserManagementView />;
        case ViewType.SYSTEM_LOGS: return <SystemLogsView />;
        default: return <DashboardView />;
      }
    }
  };

  return (
    <div className="flex h-screen bg-[#05070a] overflow-hidden">
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView} 
        onLogout={handleLogout} 
        role={currentUser.role}
        userName={currentUser.name}
      />
      
      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative z-10 scrollbar-hide">
        <div className="max-w-[1600px] mx-auto">
          <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] animate-pulse ${currentUser.role === 'ADMIN' ? 'text-indigo-500 bg-indigo-500' : 'text-emerald-500 bg-emerald-500'}`}></div>
                <p className={`text-xs font-black uppercase tracking-[0.3em] mono ${currentUser.role === 'ADMIN' ? 'text-indigo-400' : 'text-emerald-500'}`}>
                  {currentUser.role} NODE: AUTHORIZED
                </p>
              </div>
              <h1 className="text-5xl font-black text-white tracking-tighter leading-tight">
                {activeView.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
              </h1>
            </div>
            
            <div className="flex items-center space-x-6 bg-[#0f1115] border border-white/5 p-2 pr-6 rounded-full glass">
              <div className="flex -space-x-3">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name}`} className="w-10 h-10 rounded-full border-2 border-[#05070a] bg-[#1e293b]" alt="A" />
              </div>
              <div className="h-6 w-[1px] bg-white/10"></div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-white tracking-wide">{currentUser.name}</span>
                <span className={`text-[10px] font-bold uppercase tracking-tighter ${currentUser.role === 'ADMIN' ? 'text-indigo-400' : 'text-emerald-400'}`}>
                  {currentUser.id}
                </span>
              </div>
            </div>
          </header>

          <div className="transition-all duration-500">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
