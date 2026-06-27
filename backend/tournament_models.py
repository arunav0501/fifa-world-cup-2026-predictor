import pandas as pd 
import numpy as np 
import pickle 
from football_model import simulate_match,simulate_knockout

with open("team_stats.pkl","rb") as f:
    team_stats = pickle.load(f)



def generate_group_fixtures(group_teams):
    fixtures = []
    n = len(group_teams)

    for i in range(n):
        for j in range(i+1,n):
            fixtures.append(
                (group_teams[i],group_teams[j])
            )
        
    return fixtures



def initialize_group(group_teams):

    standings = {}

    for team in group_teams:

        standings[team] = {

            "points":0,

            "wins":0,

            "draws":0,

            "losses":0,

            "elo":team_stats[team]["elo"]

        }

    return standings

def update_standings(
    standings,
    home,
    away,
    result
):

    if result == 2:

        standings[home]["points"] += 3

        standings[home]["wins"] += 1

        standings[away]["losses"] += 1

    elif result == 0:

        standings[away]["points"] += 3

        standings[away]["wins"] += 1

        standings[home]["losses"] += 1

    else:

        standings[home]["points"] += 1

        standings[away]["points"] += 1

        standings[home]["draws"] += 1

        standings[away]["draws"] += 1

