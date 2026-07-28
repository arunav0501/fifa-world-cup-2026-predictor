import time
from football_model import predict_match

start = time.time()
for _ in range(100):
    predict_match("Brazil", "France")
end = time.time()

print(f"100 matches took {end - start:.2f} seconds")
