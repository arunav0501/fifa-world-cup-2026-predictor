import pandas as pd 
import pickle 
import numpy as np

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

with open(BASE_DIR /"team_stats.pkl","rb") as f:
    team_stats = pickle.load(f)

with open(BASE_DIR /"worldcup_xgb.pkl","rb") as f:
    xgb = pickle.load(f)

with open(BASE_DIR /"features.pkl","rb") as f:
    features = pickle.load(f)

def create_match_features(home_team,away_team):
    home = team_stats[home_team]
    away = team_stats[away_team]

    features_dict = {
        'home_win_rate':home['win_rate'],
        'away_win_rate' : away['win_rate'],
        'home_avg_goals' : home['avg_goals'],
        'away_avg_goals' : away['avg_goals'],
        'home_avg_conceded' : home['avg_conceded'],
        'away_avg_conceded' : away['avg_conceded'],
        'win_rate_diff' : home['win_rate'] - away['win_rate'],
        'avg_goals_diff' : home['avg_goals'] - away['avg_goals'],
        'avg_conceded_diff' : home['avg_conceded'] - away['avg_conceded'],
        'home_advantage' : 0,
        'is_friendly' : 0,
        'is_worldcup' : 1,
        'is_qualifier' : 0,
        'home_elo' : home['elo'],
        'away_elo' : away['elo'],
        'elo_diff' : home['elo'] - away['elo'],
        'elo_diff_squared' : (home['elo'] - away['elo'])**2,
        'elo_gap' : abs(home['elo'] - away['elo']),
        'form_gap' : abs(home['win_rate'] - away['win_rate'])
    }

    return pd.DataFrame([features_dict])[features]


def predict_match(home_team, away_team):

    X = create_match_features(home_team, away_team)

    probs = xgb.predict_proba(X)[0]

    return {
        "away_win": float(probs[0]),
        "draw": float(probs[1]),
        "home_win": float(probs[2])
    }

def show_prediction(team1,team2):
    probs = predict_match(team1,team2)
    print(f"{team1} vs {team2}")
    print()

    print(
        f"{team1} Win: "
        f"{probs["home_win"]:.2%}"
    )
    print(
        f"Draw : "
        f"{probs["draw"]:.2%}"
    )
    print(
        f"{team2} Win: "
        f"{probs["away_win"]:.2%}"
    )
    

def simulate_match(home_team, away_team):

    X = create_match_features(
        home_team,
        away_team
    )

    probs = xgb.predict_proba(X)[0]

    outcome = np.random.choice(
        [0,1,2],
        p=probs
    )

    return int(outcome)


def simulate_knockout(team1, team2):

    result = simulate_match(team1, team2)

    if result == 2:
        return team1

    elif result == 0:
        return team2

    else:
        probs = predict_match(team1, team2)

        p = np.array([
            probs['home_win'],
            probs['away_win']
        ], dtype=np.float64)

        p /= p.sum()

        winner = np.random.choice(
            [team1, team2],
            p=p
        )

    return winner

