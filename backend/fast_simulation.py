import numpy as np
from football_model import predict_match

_prob_cache = {}

def get_cached_probs(home, away):
    key = (home, away)
    if key not in _prob_cache:
        d = predict_match(home, away)
        # Probabilities are ordered [away_win, draw, home_win] to match the model's output [0, 1, 2]
        p = np.array([d['away_win'], d['draw'], d['home_win']], dtype=np.float64)
        p /= p.sum() # Normalize to strictly sum to 1 to avoid np.random.choice ValueError
        _prob_cache[key] = p
    return _prob_cache[key]

def fast_simulate_match(home, away):
    p = get_cached_probs(home, away)
    return int(np.random.choice([0, 1, 2], p=p))

def fast_simulate_knockout(team1, team2):
    result = fast_simulate_match(team1, team2)
    if result == 2:
        return team1
    elif result == 0:
        return team2
    else:
        p = get_cached_probs(team1, team2)
        # If draw, calculate penalty winner ignoring the draw probability
        # get_cached_probs returns [away_win, draw, home_win]
        p_no_draw = np.array([p[2], p[0]], dtype=np.float64)
        p_no_draw /= p_no_draw.sum()
        winner = np.random.choice([team1, team2], p=p_no_draw)
        return str(winner)
