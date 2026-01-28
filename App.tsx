
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
import SettingsView from './components/SettingsView';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('gp_active_session');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("CRITICAL: Failed to restore session from localStorage.", e);
      localStorage.removeItem('gp_active_session'); // Clear corrupted state
      return null;
    }
  });
  
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);

  // Sync current user with localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem('gp_active_session', JSON.stringify(currentUser));
        
        // Also update in the global user registry
        const dbKey = currentUser.role === 'ADMIN' ? 'gp_admins' : 'gp_users';
        const accountsRaw = localStorage.getItem(dbKey);
        const accounts = accountsRaw ? JSON.parse(accountsRaw) : {};
        
        if (accounts[currentUser.id]) {
          accounts[currentUser.id].profile = currentUser;
          localStorage.setItem(dbKey, JSON.stringify(accounts));
        }
      } catch (e) {
        console.error("Sync error:", e);
      }
    }
  }, [currentUser]);

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setActiveView(user.role === 'ADMIN' ? ViewType.DASHBOARD : ViewType.MY_PROFILE);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('gp_active_session');
  };

  const updateUserProfile = (updatedProfile: Partial<UserProfile>) => {
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, ...updatedProfile } : null);
    }
  };

  if (!currentUser) {
    return <LoginView onLoginSuccess={handleLogin} />;
  }

  const renderView = () => {
    // Shared views
    if (activeView === ViewType.AI_INSIGHTS) return <AiInsights />;
    if (activeView === ViewType.LEADERBOARD) return <LeaderboardView />;
    if (activeView === ViewType.SETTINGS) return <SettingsView user={currentUser} onUpdate={updateUserProfile} />;

    // Role-specific views
    if (currentUser.role === 'USER') {
      switch (activeView) {
        case ViewType.MY_PROFILE: return <UserPortalView user={currentUser} onUpdate={updateUserProfile} />;
        default: return <UserPortalView user={currentUser} onUpdate={updateUserProfile} />;
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
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10 scrollbar-hide">
        <div className="max-w-[1400px] mx-auto">
          <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] animate-pulse ${currentUser.role === 'ADMIN' ? 'text-indigo-500 bg-indigo-500' : 'text-emerald-500 bg-emerald-500'}`}></div>
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mono ${currentUser.role === 'ADMIN' ? 'text-indigo-400' : 'text-emerald-500'}`}>
                  {currentUser.role} NODE: {currentUser.id}
                </p>
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter">
                {activeView.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4 bg-[#0f1115] border border-white/5 p-2 pr-6 rounded-2xl glass shadow-lg">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name}`} className="w-10 h-10 rounded-xl bg-[#1e293b]" alt="Avatar" />
              <div className="h-6 w-[1px] bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white leading-none">{currentUser.name}</span>
                <span className="text-[10px] font-bold uppercase text-slate-500 mt-1">{currentUser.points} XP</span>
              </div>
            </div>
          </header>

          <div className="transition-all duration-300">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
