import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Activity, BarChart2, Cpu } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Activity className="w-8 h-8 text-[#00C896]" />,
      title: "Match Predictor",
      description: "Predict the outcome of any match using our advanced XGBoost model."
    },
    {
      icon: <Trophy className="w-8 h-8 text-[#F4C542]" />,
      title: "Tournament Simulator",
      description: "Simulate the entire World Cup from group stages to the final."
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-[#0057B8]" />,
      title: "Analytics",
      description: "Dive deep into Monte Carlo simulations to see who has the best odds."
    },
    {
      icon: <Cpu className="w-8 h-8 text-purple-400" />,
      title: "Monte Carlo Engine",
      description: "Running thousands of simulations to calculate precise probabilities."
    }
  ];

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="flex justify-center mb-6"
          >
            <Trophy className="w-24 h-24 text-[#F4C542] drop-shadow-[0_0_15px_rgba(244,197,66,0.6)]" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            FIFA World Cup 2026 <br className="hidden md:block"/>
            <span className="text-gradient">Predictor</span>
          </h1>
          
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto mb-10">
            Machine Learning powered football prediction platform using XGBoost, Elo Rating and Monte Carlo Simulation.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => navigate('/predict')} variant="primary" className="text-lg">
              Predict Match
            </Button>
            <Button onClick={() => navigate('/tournament')} variant="outline" className="text-lg">
              Simulate Tournament
            </Button>
          </div>
        </motion.div>

        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#0057B8]/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-white/5 rounded-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 py-12 border-t border-white/10 text-center"
      >
        <h2 className="text-3xl font-bold mb-8 text-gradient">The Engine Under the Hood</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Dataset</h4>
            <p className="text-gray-400 text-sm">International matches since 1872</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Model</h4>
            <p className="text-gray-400 text-sm">XGBoost Classifier</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Features</h4>
            <p className="text-gray-400 text-sm">Elo Rating, Recent Form, Goal Diff</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Tech</h4>
            <p className="text-gray-400 text-sm">FastAPI & React & Framer Motion</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
