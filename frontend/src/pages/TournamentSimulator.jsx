import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Loader2, ChevronRight, Medal } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { simulateWorldCup } from '../services/api';

const TournamentSimulator = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSimulate = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await simulateWorldCup();
      
      // Artificial delay to show the nice animation
      setTimeout(() => {
        setData(result);
        setLoading(false);
        fireConfetti();
      }, 2500);
      
    } catch (err) {
      setError("Failed to simulate tournament.");
      setLoading(false);
    }
  };

  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#0057B8', '#F4C542', '#00C896']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#0057B8', '#F4C542', '#00C896']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      
      {!data && !loading && (
        <div className="text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Simulate the World Cup</h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Run a full Monte Carlo simulation of the 2026 FIFA World Cup, from Group Stage to the Final, using real-world Elo ratings and XGBoost predictions.
          </p>
          <Button onClick={handleSimulate} className="text-xl px-8 py-4 w-full md:w-auto">
            Simulate Tournament Now
          </Button>
          {error && <p className="text-red-400 mt-4">{error}</p>}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-32 space-y-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <Loader2 className="w-32 h-32 text-[#F4C542]/80" />
          </motion.div>
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-gradient">Simulating Tournament...</h3>
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-[#00C896]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {data && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            
            {/* Champion Reveal */}
            <div className="text-center mt-10 mb-20 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#F4C542]/20 blur-[80px] rounded-full -z-10"></div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <Card className="inline-block p-10 border-[#F4C542]/50 shadow-[0_0_30px_rgba(244,197,66,0.3)]">
                  <Trophy className="w-20 h-20 text-[#F4C542] mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-300 mb-2">2026 World Cup Champion</h2>
                  <h1 className="text-5xl md:text-7xl font-black text-white">{data.champion}</h1>
                </Card>
              </motion.div>
            </div>

            {/* Knockout Stages */}
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Medal className="text-[#0057B8]" />
                Knockout Stage
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* We can map through the rounds if available in data, or manually render them */}
                {['round_of_32', 'round_of_16', 'quarterfinals', 'semifinals'].map((round, idx) => (
                  <Card key={round} className="bg-white/5 border-none">
                    <h3 className="text-xl font-bold text-[#00C896] capitalize mb-4 border-b border-white/10 pb-2">
                      {round.replace(/_/g, ' ')}
                    </h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                      {data[round]?.matches?.map((match, mIdx) => (
                        <div key={mIdx} className="bg-black/20 p-3 rounded-lg flex flex-col gap-1 text-sm">
                          <div className={`flex justify-between ${data[round].winners[mIdx] === match[0] ? 'text-white font-bold' : 'text-gray-500'}`}>
                            <span>{match[0]}</span>
                          </div>
                          <div className={`flex justify-between ${data[round].winners[mIdx] === match[1] ? 'text-white font-bold' : 'text-gray-500'}`}>
                            <span>{match[1]}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Final Match */}
            <div className="py-10 flex justify-center">
              <Card className="w-full max-w-2xl bg-gradient-to-br from-[#0057B8]/20 to-[#0B1020] border-[#0057B8]/30">
                <h3 className="text-center text-xl font-bold text-gray-300 mb-6 uppercase tracking-widest">The Final</h3>
                <div className="flex items-center justify-between px-4 md:px-10">
                  <div className={`text-2xl md:text-4xl font-black ${data.final.winner === data.final.match[0][0] ? 'text-white' : 'text-gray-500'}`}>
                    {data.final.match[0][0]}
                  </div>
                  <span className="text-gray-500 font-bold mx-4">VS</span>
                  <div className={`text-2xl md:text-4xl font-black ${data.final.winner === data.final.match[0][1] ? 'text-white' : 'text-gray-500'}`}>
                    {data.final.match[0][1]}
                  </div>
                </div>
              </Card>
            </div>

            {/* Group Stage tables */}
            <div>
              <h2 className="text-3xl font-bold mb-8 mt-16 flex items-center gap-3">
                <ChevronRight className="text-[#F4C542]" />
                Group Stage Standings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(data.group_stage || {}).map(([groupName, groupData]) => (
                  <Card key={groupName} className="p-0 overflow-hidden">
                    <div className="bg-white/5 py-3 px-4 font-bold text-lg border-b border-white/10 flex justify-between items-center">
                      <span>Group {groupName}</span>
                    </div>
                    <div className="p-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-gray-400 text-left border-b border-white/10">
                            <th className="pb-2 font-medium">Pos</th>
                            <th className="pb-2 font-medium">Team</th>
                            <th className="pb-2 font-medium text-center">W</th>
                            <th className="pb-2 font-medium text-center">D</th>
                            <th className="pb-2 font-medium text-center">L</th>
                            <th className="pb-2 font-medium text-right">Pts</th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupData.table?.map((team, idx) => (
                            <tr key={team.team} className={`border-b border-white/5 last:border-0 ${idx < 2 ? 'text-white' : idx === 2 ? 'text-gray-300' : 'text-gray-500'}`}>
                              <td className="py-2">{idx + 1}</td>
                              <td className={`py-2 font-semibold ${idx === 0 ? 'text-[#00C896]' : ''}`}>{team.team}</td>
                              <td className="py-2 text-center">{team.wins}</td>
                              <td className="py-2 text-center">{team.draws}</td>
                              <td className="py-2 text-center">{team.losses}</td>
                              <td className="py-2 text-right font-bold">{team.points}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default TournamentSimulator;
