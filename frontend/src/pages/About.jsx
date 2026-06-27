import React from 'react';
import { motion } from 'framer-motion';
import { Database, BrainCircuit, Activity, Cpu, Code, Shield } from 'lucide-react';
import Card from '../components/ui/Card';

const About = () => {
  const techStack = [
    { name: "React + Vite", icon: <Code className="w-8 h-8 text-[#00C896]" />, description: "Frontend UI and components" },
    { name: "FastAPI", icon: <Cpu className="w-8 h-8 text-[#0057B8]" />, description: "High-performance Python backend" },
    { name: "XGBoost", icon: <BrainCircuit className="w-8 h-8 text-[#F4C542]" />, description: "Gradient boosting machine learning model" },
    { name: "Tailwind & Framer", icon: <Activity className="w-8 h-8 text-purple-400" />, description: "Styling and smooth animations" }
  ];

  const timeline = [
    { title: "Dataset Construction", desc: "Historical match data since 1872 combined with FIFA rankings." },
    { title: "Feature Engineering", desc: "Calculated dynamic Elo Ratings, recent team form, and goal differentials." },
    { title: "Model Training", desc: "Trained an XGBoost multi-class classifier to predict Home Win, Draw, or Away Win." },
    { title: "Simulation Engine", desc: "Built a Monte Carlo simulation engine to project tournament paths thousands of times." }
  ];

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About the Predictor</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Built as a professional football analytics platform showcasing the intersection of Machine Learning and web development.
        </p>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#0057B8]" />
          Architecture & Technology
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="text-center h-full flex flex-col items-center p-6">
                <div className="mb-4">{tech.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-white">{tech.name}</h3>
                <p className="text-sm text-gray-400">{tech.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <Database className="w-6 h-6 text-[#F4C542]" />
          Methodology Timeline
        </h2>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0B1020] bg-[#00C896] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="font-bold text-sm">{idx + 1}</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur shadow">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-white">{item.title}</div>
                </div>
                <div className="text-gray-400 text-sm">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
