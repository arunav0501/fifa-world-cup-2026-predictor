import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select';
import { Activity, ShieldAlert } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import { predictMatch } from '../services/api';
import { teams } from '../utils/teams';

const formatOptionLabel = ({ value, label, code }) => (
  <div className="flex items-center gap-3 text-[#0B1020]">
    <img src={`https://flagcdn.com/w40/${code}.png`} alt={label} className="w-6 h-auto shadow-sm rounded-sm" />
    <span className="font-medium">{label}</span>
  </div>
);

const customStyles = {
  control: (base) => ({
    ...base,
    background: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    borderRadius: '0.75rem',
    padding: '0.5rem',
    boxShadow: 'none',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '0.75rem',
    overflow: 'hidden',
    zIndex: 50,
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? '#f1f5f9' : 'white',
    cursor: 'pointer',
  }),
};

const MatchPredictor = () => {
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    if (!homeTeam || !awayTeam) {
      setError("Please select both teams.");
      return;
    }
    if (homeTeam.value === awayTeam.value) {
      setError("A team cannot play against itself.");
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const data = await predictMatch(homeTeam.value, awayTeam.value);
      // Wait a bit for smooth loading animation
      setTimeout(() => {
        setResult({
          homeWin: data.home_win * 100,
          draw: data.draw * 100,
          awayWin: data.away_win * 100,
        });
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError("Failed to fetch prediction. Is the backend running?");
      setLoading(false);
    }
  };

  const getWinnerInfo = () => {
    if (!result) return null;
    if (result.homeWin > result.awayWin && result.homeWin > result.draw) return { team: homeTeam, color: 'text-[#00C896]' };
    if (result.awayWin > result.homeWin && result.awayWin > result.draw) return { team: awayTeam, color: 'text-[#00C896]' };
    return { team: { label: 'Draw' }, color: 'text-[#F4C542]' };
  };

  const winner = getWinnerInfo();

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Match Predictor</h1>
        <p className="text-gray-400 text-lg">Select two teams to predict the exact probabilities of the match outcome.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-300">Home Team</label>
          <Select
            options={teams.filter(t => t.value !== awayTeam?.value)}
            formatOptionLabel={formatOptionLabel}
            styles={customStyles}
            value={homeTeam}
            onChange={setHomeTeam}
            placeholder="Search Home Team..."
          />
        </Card>

        <Card className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-300">Away Team</label>
          <Select
            options={teams.filter(t => t.value !== homeTeam?.value)}
            formatOptionLabel={formatOptionLabel}
            styles={customStyles}
            value={awayTeam}
            onChange={setAwayTeam}
            placeholder="Search Away Team..."
          />
        </Card>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-400 justify-center mb-8 bg-red-400/10 py-3 rounded-lg">
          <ShieldAlert className="w-5 h-5" />
          <span>{error}</span>
        </motion.div>
      )}

      <div className="flex justify-center mb-12">
        <Button onClick={handlePredict} disabled={loading} className="w-full md:w-64">
          {loading ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <Activity className="w-6 h-6" />
            </motion.div>
          ) : (
            <span className="text-lg">Predict Match</span>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0057B8] via-[#00C896] to-[#F4C542]"></div>
              
              <div className="text-center mb-10">
                <h2 className="text-xl text-gray-300 mb-2">Predicted Outcome</h2>
                <div className="flex items-center justify-center gap-4 text-4xl font-bold">
                  {winner.team.code && (
                    <img src={`https://flagcdn.com/w80/${winner.team.code}.png`} alt="flag" className="w-12 rounded shadow-lg" />
                  )}
                  <span className={winner.color}>{winner.team.label}</span>
                </div>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                <ProgressBar label={`${homeTeam.label} Win`} percentage={result.homeWin} color="bg-[#0057B8]" />
                <ProgressBar label="Draw" percentage={result.draw} color="bg-[#F4C542]" />
                <ProgressBar label={`${awayTeam.label} Win`} percentage={result.awayWin} color="bg-[#00C896]" />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MatchPredictor;
