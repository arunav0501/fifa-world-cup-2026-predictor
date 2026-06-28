import pandas as pd
import numpy as np
import pickle 
from tournament_models import generate_group_fixtures,initialize_group,update_standings
from football_model import simulate_match,simulate_knockout

from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

DATA_DIR = PROJECT_ROOT / "data"

df = pd.read_csv(DATA_DIR / "draws.csv")

# Convert the DataFrame to the desired dictionary format
groups = {col.split()[-1]: df[col].tolist() for col in df.columns}


def sort_group(standings):

    table = []

    for team, data in standings.items():

        table.append({
            "team": team,
            "points": data["points"],
            "wins": data["wins"],
            "draws": data["draws"],
            "losses": data["losses"],
            "elo": data["elo"]
        })

    table.sort(
        key=lambda x: (
            x["points"],
            x["elo"]
        ),
        reverse=True
    )

    return table



def simulate_group(group_name):

    teams = groups[group_name]

    fixtures = generate_group_fixtures(teams)

    standings = initialize_group(teams)

    for home, away in fixtures:

        result = simulate_match(home, away)

        update_standings(
            standings,
            home,
            away,
            result
        )

    table = sort_group(standings)

    return {
    "group": group_name,
    "table": table,
    "winner": table[0]["team"],
    "runner_up": table[1]["team"],
    "third": table[2]["team"],
    "fourth": table[3]["team"]
}




def simulate_group_stage():

    all_groups = {}

    for group in groups.keys():

        all_groups[group] = simulate_group(group)

    return all_groups



def extract_qualifiers(group_results):
    winners = []
    runners_up = []
    third_place = []

    for group,result in group_results.items():
        winners.append(result['winner'])

        runners_up.append(result['runner_up'])

        third_place.append({
            "group" : group,
            "team" : result['third'],
            "points" : result['table'][2]["points"],
            "elo": result["table"][2]["elo"]
        })

    return winners,runners_up,third_place
    
def rank_third_place(third_place):

    third_place.sort(

        key=lambda x: (

            x["points"],

            x["elo"]

        ),

        reverse=True

    )

    return third_place[:8]

def main():

    group_results = simulate_group_stage()

    winners, runners_up, third_place = extract_qualifiers(group_results)

    best_third = rank_third_place(third_place)

    print(winners)
    print(runners_up)
    print(best_third)


if __name__ == "__main__":
    main()