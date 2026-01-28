
import React from 'react';

const mockStudents = [
  { rank: 1, name: 'Alex Rivera', id: 'STU-1029', bottles: 452, points: 4520, avatar: 'https://picsum.photos/seed/alex/40/40' },
  { rank: 2, name: 'Sarah Chen', id: 'STU-1044', bottles: 412, points: 4120, avatar: 'https://picsum.photos/seed/sarah/40/40' },
  { rank: 3, name: 'Jordan Smith', id: 'STU-0982', bottles: 388, points: 3880, avatar: 'https://picsum.photos/seed/jordan/40/40' },
  { rank: 4, name: 'Emily Blunt', id: 'STU-1122', bottles: 350, points: 3500, avatar: 'https://picsum.photos/seed/emily/40/40' },
  { rank: 5, name: 'David Miller', id: 'STU-1055', bottles: 310, points: 3100, avatar: 'https://picsum.photos/seed/david/40/40' },
];

const LeaderboardView: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Top Recyclers</h3>
          <p className="text-sm text-slate-500">Current Semester Rankings</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">
            Export Report
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/50 text-left">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Bottles</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Points</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rewards Earned</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockStudents.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    student.rank === 1 ? 'bg-yellow-100 text-yellow-700' : 
                    student.rank === 2 ? 'bg-slate-100 text-slate-700' : 
                    student.rank === 3 ? 'bg-orange-100 text-orange-700' : 'text-slate-500'
                  }`}>
                    {student.rank}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <img src={student.avatar} alt="" className="w-10 h-10 rounded-full border border-slate-200" />
                    <div>
                      <div className="text-sm font-bold text-slate-800">{student.name}</div>
                      <div className="text-xs text-slate-400 font-medium">{student.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-700">
                  {student.bottles}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                    {student.points.toLocaleString()} pts
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    {[1, 2, 3].slice(0, 4 - student.rank).map((_, i) => (
                      <i key={i} className="fas fa-gift text-orange-400 text-xs"></i>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-50/50 text-center border-t border-slate-100">
        <button className="text-sm font-semibold text-green-600 hover:text-green-700">View All 1,240 Students</button>
      </div>
    </div>
  );
};

export default LeaderboardView;
