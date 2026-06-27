import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Activity, BarChart2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { championProbabilities } from '../services/api';

const COLORS = ['#0057B8', '#F4C542', '#00C896', '#ea4335', '#a855f7', '#f97316', '#3b82f6', '#10b981'];

const Analytics = () => {
  const [simulations, setSimulations] = useState(100);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchProbabilities = async (sims) => {
    setLoading(true);
    setError(null);
    try {
      const result = await championProbabilities(sims);
      // transform object to array and sort
      const arr = Object.entries(result)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
      
      setData(arr);
    } catch (err) {
      setError("Failed to fetch analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProbabilities(simulations);
  }, [simulations]);

  const topTeams = data.slice(0, 5);
  const pieData = data.slice(0, 8).concat({
    name: 'Others',
    value: data.slice(8).reduce((acc, curr) => acc + curr.value, 0)
  }).filter(d => d.value > 0);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Monte Carlo Analytics</h1>
        <p className="text-gray-400 text-lg">Run thousands of simulations to calculate accurate tournament probabilities.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {[100, 500, 1000, 5000].map(num => (
          <Button
            key={num}
            variant={simulations === num ? 'primary' : 'outline'}
            onClick={() => setSimulations(num)}
            className="w-32"
          >
            {num} Sims
          </Button>
        ))}
      </div>

      {error && <p className="text-red-400 text-center mb-8">{error}</p>}

      {loading ? (
        <div className="flex justify-center py-20">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
            <Activity className="w-12 h-12 text-[#00C896]" />
          </motion.div>
        </div>
      ) : (
        <AnimatePresence>
          {data.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              
              {/* Top Teams Probability Cards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {topTeams.map((team, idx) => (
                  <Card key={team.name} className="text-center p-4" hover={false}>
                    <div className="text-2xl font-black mb-1" style={{ color: COLORS[idx % COLORS.length] }}>
                      {team.value.toFixed(1)}%
                    </div>
                    <div className="text-sm font-medium text-gray-300 truncate">{team.name}</div>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <Card className="p-4 h-96">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-[#0057B8]" />
                    Top Contenders (Bar)
                  </h3>
                  <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={topTeams} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <XAxis dataKey="name" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" tickFormatter={tick => `${tick}%`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0B1020', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                        formatter={(value) => [`${value}%`, 'Probability']}
                      />
                      <Bar dataKey="value" fill="#0057B8" radius={[4, 4, 0, 0]}>
                        {topTeams.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                {/* Pie Chart */}
                <Card className="p-4 h-96">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#F4C542]" />
                    Probability Distribution (Pie)
                  </h3>
                  <ResponsiveContainer width="100%" height="80%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0B1020', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        formatter={(value) => [`${value.toFixed(1)}%`, 'Probability']}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Ranking Table */}
              <Card className="overflow-hidden p-0">
                <div className="bg-white/5 py-4 px-6 border-b border-white/10">
                  <h3 className="font-bold text-lg">Full Ranking Table</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-[#0B1020]/95 backdrop-blur z-10 border-b border-white/10">
                      <tr className="text-gray-400 text-left">
                        <th className="py-3 px-6 font-medium">Rank</th>
                        <th className="py-3 px-6 font-medium">Team</th>
                        <th className="py-3 px-6 font-medium text-right">Probability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((team, idx) => (
                        <tr key={team.name} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-6 text-gray-500 font-medium">#{idx + 1}</td>
                          <td className="py-3 px-6 font-semibold text-gray-200">{team.name}</td>
                          <td className="py-3 px-6 text-right font-bold text-[#00C896]">{team.value.toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Analytics;
