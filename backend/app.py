from fastapi import FastAPI
from pydantic import BaseModel

from football_model import (
    predict_match,
    simulate_match,
    simulate_knockout
)

from knockout_stage import(
    simulate_world_cup,
    simulate_many
)

app = FastAPI(
    title="FIFA World Cup 2026 Predictor API",
    description="Machine Learning based FIFA World Cup 2026 Prediction API",
    version="1.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://fifa-world-cup-2026-predictor-iota.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class MatchRequest(BaseModel):
    home_team : str
    away_team : str

class MonteCarloRequest(BaseModel):
    simulations : int = 100

@app.get("/")
def home():
    return{
        "message" : "FIFA World Cup 2026 Predictor API",
        "status" : "Running"
    }

@app.post("/predict-match")
def predict_match_api(match:MatchRequest):
    probabilities = predict_match(match.home_team,match.away_team)
    return probabilities

@app.post("/simulate-match")
def simulate_match_api(match: MatchRequest):

    result = int(simulate_match(match.home_team, match.away_team))

    if result == 2:
        winner = match.home_team
    elif result == 0:
        winner = match.away_team
    else:
        winner = "Draw"

    return {
        "result": result,
        "winner": winner
    }

@app.get("/simulate-world-cup")
def simulate_world_cup_api():
    result = simulate_world_cup()
    return result

@app.post("/champion-probabilites")
def champion_probabilities(request: MonteCarloRequest):
    results = simulate_many(request.simulations)

    total = request.simulations

    probabilites = {}

    for team,wins in results.items():
        probabilites[team] = round(wins/total * 100,2)

    
    return probabilites

