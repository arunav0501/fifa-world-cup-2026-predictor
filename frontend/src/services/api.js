import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getStatus = async () => {
  const response = await api.get('/');
  return response.data;
};

export const predictMatch = async (home_team, away_team) => {
  const response = await api.post('/predict-match', { home_team, away_team });
  return response.data;
};

export const simulateMatch = async (home_team, away_team) => {
  const response = await api.post('/simulate-match', { home_team, away_team });
  return response.data;
};

export const simulateWorldCup = async () => {
  const response = await api.get('/simulate-world-cup');
  return response.data;
};

export const championProbabilities = async (simulations = 100) => {
  const response = await api.post('/champion-probabilities', { simulations });
  return response.data;
};

export default api;
