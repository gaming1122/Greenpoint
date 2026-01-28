
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '01', count: 420 },
  { name: '02', count: 380 },
  { name: '03', count: 650 },
  { name: '04', count: 890 },
  { name: '05', count: 520 },
  { name: '06', count: 1050 },
  { name: '07', count: 1240 },
];

const DashboardView: React.FC = () => {
  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Recycled Volume" value="12,482" unit="units" icon="fa-recycle" color="text-emerald-500" trend="+12%" />
        <StatCard label="Node Network" value="1,240" unit="active" icon="fa-satellite-dish" color="text-indigo-500" trend="+5%" />
        <StatCard label="CO2 Captured" value="3,205" unit="kg" icon="fa-wind" color="text-orange-500" trend="+22%" />
        <StatCard label="Stored Energy" value="42.8" unit="kWh" icon="fa-bolt" color="text-rose-500" trend="+8%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0f1115] p-8 rounded-[3rem] shadow-2xl border border-white/5 relative overflow-hidden glass">
          <div className="absolute top-0 right-0 p-8">
            <i className="fas fa-chart-line text-emerald-500/20 text-6xl"></i>
          </div>
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div>
              <h3 className="text-3xl font-black text-white tracking-tighter mb-1">Impact Telemetry</h3>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mono">Daily ingestion rate / v2.1.0</p>
            </div>
            <div className="bg-[#05070a] p-1 rounded-2xl flex space-x-1 border border-white/5">
               <button className="px-4 py-2 bg-emerald-500 text-slate-900 font-black rounded-xl text-[10px] uppercase tracking-widest">Inbound</button>
               <button className="px-4 py-2 text-slate-500 hover:text-white font-black rounded-xl text-[10px] uppercase tracking-widest transition-colors">Outbound</button>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 800}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 800}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0f1115', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', padding: '20px', color: '#fff'}}
                  itemStyle={{color: '#10b981', fontWeight: 900}}
                />
                <Area type="monotone" dataKey="count" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#0f1115] p-8 rounded-[3rem] border border-white/5 glass relative overflow-hidden group">
            <h3 className="text-xl font-black text-white mb-8 tracking-tighter flex items-center justify-between">
              Live Bin Matrix
              <div className="flex space-x-1">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-75"></span>
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-150"></span>
              </div>
            </h3>
            <div className="space-y-8">
              <BinStatus name="Sector Alpha" fill={72} color="bg-emerald-500" />
              <BinStatus name="Terminal Beta" fill={15} color="bg-indigo-500" />
              <BinStatus name="Cargo Hub" fill={95} color="bg-rose-500" alert />
            </div>
            <button className="w-full mt-10 py-4 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl transition-all border border-white/5">
              Full Diagnostics
            </button>
          </div>
          
          <div className="bg-emerald-500 p-8 rounded-[3rem] shadow-[0_30px_60px_rgba(16,185,129,0.2)] floating">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-[#05070a] w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl">
                <i className="fas fa-microchip text-emerald-500 text-xl"></i>
              </div>
              <span className="text-[10px] font-black text-slate-900/60 uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Automated</span>
            </div>
            <h4 className="text-slate-900 text-xl font-black tracking-tighter mb-2">Predictive Maintenance</h4>
            <p className="text-slate-900/70 text-sm font-bold leading-snug">Storage Hub sensor triggers threshold in 2.4 hours. Dispatching maintenance drone sequence.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{label: string; value: string; unit: string; icon: string; color: string; trend: string}> = ({label, value, unit, icon, color, trend}) => (
  <div className="bg-[#0f1115] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 glass">
    <div className={`absolute top-0 right-0 p-8 ${color} opacity-5 group-hover:opacity-10 transition-opacity`}>
      <i className={`fas ${icon} text-5xl`}></i>
    </div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-8">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mono">{label}</span>
        <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg shadow-sm">{trend}</span>
      </div>
      <div className="flex items-baseline space-x-2">
        <h4 className="text-4xl font-black text-white tracking-tighter">{value}</h4>
        <span className="text-slate-500 text-sm font-black uppercase tracking-widest">{unit}</span>
      </div>
    </div>
  </div>
);

const BinStatus: React.FC<{name: string; fill: number; color: string; alert?: boolean}> = ({name, fill, color, alert}) => (
  <div>
    <div className="flex justify-between items-center mb-3">
      <span className="text-xs font-black text-white tracking-widest uppercase">{name}</span>
      <span className={`text-[10px] font-black mono ${alert ? 'text-rose-500 animate-pulse' : 'text-slate-500'}`}>{fill}% LOAD</span>
    </div>
    <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5 p-[2px]">
      <div 
        className={`h-full rounded-full transition-all duration-[2000ms] ease-out shadow-[0_0_10px_rgba(0,0,0,0.5)] ${color} ${alert ? 'neon-glow' : ''}`} 
        style={{width: `${fill}%`}}
      ></div>
    </div>
  </div>
);

export default DashboardView;
