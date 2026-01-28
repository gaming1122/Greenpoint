
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
    <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-700">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Recycled" value="12.4K" unit="u" icon="fa-recycle" color="text-emerald-500" trend="+12%" />
        <StatCard label="Nodes" value="1,240" unit="act" icon="fa-satellite-dish" color="text-indigo-500" trend="+5%" />
        <StatCard label="CO2 Save" value="3,205" unit="kg" icon="fa-wind" color="text-orange-500" trend="+22%" />
        <StatCard label="Uptime" value="99.9" unit="%" icon="fa-bolt" color="text-rose-500" trend="OK" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0f1115] p-6 rounded-[2.5rem] shadow-2xl border border-white/5 relative overflow-hidden glass">
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter">Impact Telemetry</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mono">Daily ingestion / v2.1.0</p>
            </div>
            <div className="bg-[#05070a] p-1 rounded-xl flex space-x-1 border border-white/5">
               <button className="px-4 py-1.5 bg-emerald-500 text-slate-900 font-black rounded-lg text-[9px] uppercase tracking-widest">Live</button>
               <button className="px-4 py-1.5 text-slate-500 hover:text-white font-black rounded-lg text-[9px] uppercase tracking-widest transition-colors">Log</button>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 800}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 800}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0f1115', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff'}}
                  itemStyle={{color: '#10b981', fontWeight: 900}}
                />
                <Area type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0f1115] p-6 rounded-[2.5rem] border border-white/5 glass relative overflow-hidden group">
            <h3 className="text-lg font-black text-white mb-6 tracking-tighter flex items-center justify-between">
              Live Bin Matrix
              <div className="flex space-x-1">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-75"></span>
              </div>
            </h3>
            <div className="space-y-6">
              <BinStatus name="Sector Alpha" fill={72} color="bg-emerald-500" />
              <BinStatus name="Terminal Beta" fill={15} color="bg-indigo-500" />
              <BinStatus name="Cargo Hub" fill={95} color="bg-rose-500" alert />
            </div>
          </div>
          
          <div className="bg-emerald-500/10 p-6 rounded-[2.5rem] border border-emerald-500/20 glass">
            <div className="flex justify-between items-center mb-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <i className="fas fa-microchip text-slate-900 text-sm"></i>
              </div>
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded-lg">Predictive</span>
            </div>
            <h4 className="text-white text-sm font-black tracking-tighter mb-1">Maintenance Queue</h4>
            <p className="text-slate-500 text-[10px] font-bold leading-tight">Terminal 03 threshold trigger in 2.4h. Dispatching drone...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{label: string; value: string; unit: string; icon: string; color: string; trend: string}> = ({label, value, unit, icon, color, trend}) => (
  <div className="bg-[#0f1115] p-6 rounded-3xl border border-white/5 shadow-xl group hover:border-emerald-500/30 transition-all duration-300 glass">
    <div className="flex items-center justify-between mb-4">
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mono">{label}</span>
      <i className={`fas ${icon} ${color} opacity-40 group-hover:opacity-100 transition-opacity`}></i>
    </div>
    <div className="flex items-baseline space-x-1">
      <h4 className="text-2xl font-black text-white tracking-tighter">{value}</h4>
      <span className="text-slate-600 text-[9px] font-black uppercase tracking-widest">{unit}</span>
    </div>
  </div>
);

const BinStatus: React.FC<{name: string; fill: number; color: string; alert?: boolean}> = ({name, fill, color, alert}) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <span className="text-[10px] font-black text-white tracking-widest uppercase">{name}</span>
      <span className={`text-[10px] font-black mono ${alert ? 'text-rose-500 animate-pulse' : 'text-slate-500'}`}>{fill}%</span>
    </div>
    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden p-[1px]">
      <div 
        className={`h-full rounded-full transition-all duration-[2000ms] ease-out ${color} ${alert ? 'shadow-[0_0_10px_rgba(244,63,94,0.5)]' : ''}`} 
        style={{width: `${fill}%`}}
      ></div>
    </div>
  </div>
);

export default DashboardView;
