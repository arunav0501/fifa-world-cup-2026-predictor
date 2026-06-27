from group_stage import (
    simulate_group_stage,
    extract_qualifiers,
    rank_third_place
)
from football_model import simulate_knockout
from collections import Counter


def generate_round_of_32():
    group_results = simulate_group_stage()
    winners, runners_up, third = extract_qualifiers(group_results)
    best_third = rank_third_place(third)
    best_third = [x['team'] for x in best_third]

    matches = [
        (winners[0],best_third[7]),
        (winners[1], best_third[6]),
        (winners[2], best_third[5]),
        (winners[3], best_third[4]),

        (winners[4], best_third[3]),
        (winners[5], best_third[2]),
        (winners[6], best_third[1]),
        (winners[7], best_third[0]),

        (winners[8], runners_up[11]),
        (winners[9], runners_up[10]),
        (winners[10], runners_up[9]),
        (winners[11], runners_up[8]),

        (runners_up[0], runners_up[1]),
        (runners_up[2], runners_up[3]),
        (runners_up[4], runners_up[5]),
        (runners_up[6], runners_up[7])
    ]

    return matches


def simulate_round(matches):
    winners = []
    for home,away in matches:
        winner = simulate_knockout(home,away)
        winners.append(str(winner))

    return winners 

def generate_next_round(winners):
    matches = []
    for i in range(0,len(winners),2):
        matches.append((winners[i],winners[i+1]))

    return matches


def simulate_world_cup():

    group_results = simulate_group_stage()

    winners, runners_up, third = extract_qualifiers(group_results)

    best_third = rank_third_place(third)

    round32_matches = generate_round_of_32()

    round32_winners = simulate_round(round32_matches)

    round16_matches = generate_next_round(round32_winners)
    round16_winners = simulate_round(round16_matches)

    quarter_matches = generate_next_round(round16_winners)
    quarter_winners = simulate_round(quarter_matches)

    semi_matches = generate_next_round(quarter_winners)
    semi_winners = simulate_round(semi_matches)

    final_match = generate_next_round(semi_winners)

    champion = simulate_round(final_match)[0]

    return {

        "group_stage": group_results,

        "qualified_teams": {

            "winners": winners,

            "runners_up": runners_up,

            "best_third": best_third

        },

        "round_of_32": {

            "matches": round32_matches,

            "winners": round32_winners

        },

        "round_of_16": {

            "matches": round16_matches,

            "winners": round16_winners

        },

        "quarterfinals": {

            "matches": quarter_matches,

            "winners": quarter_winners

        },

        "semifinals": {

            "matches": semi_matches,

            "winners": semi_winners

        },

        "final": {

            "match": final_match,

            "winner": champion

        },

        "champion": champion

    }

def simulate_many(n=100):

    champions = []

    for _ in range(n):
        result = simulate_world_cup()
        champions.append(result['champion'])

    return Counter(champions)


if __name__=="__main__":
    results = simulate_many(100)
    for team,wins in results.most_common():
        print(team,wins/1000)

