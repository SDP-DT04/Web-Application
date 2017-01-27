import random
import sys

outfile = open('workouts.json', 'w+')

# generate as many entries as specified on the command line
for entry in range(0, int(sys.argv[1])):
    # randomly generate some values
    rfid_tag = random.randint(10000,1000000)
    totTime = random.randint(8000, 20000)
    distance = random.randint(10, 20)
    date = random.randint(1473690000, 1473726191)

    # randomly generate weight, which is typically a multiple of 5
    weight = random.randint(0, 100)
    while weight % 5 != 0:
        weight += 1

    # randomly generate force, which is taken at 100ms samples
    coeff = []
    time = 0
    i = 0
    coeff.append(round(random.random()))
    while time < 11:
        coeff.append(round((coeff[i] + random.random()) / 2, 3))
        time += 1
        i += 1

    jsonText = "{\"rfid_tag\":  + str(rfid_tag) "," + "\"date\": " + str(date) + ",
    jsonText += "\", " + "\"weight\": " + str(weight) + ", \"tot_time\": " + str(totTime)
    jsonText += ", \"distance\":  " + str(distance) +", \"coefficients\": ["
    for val in coeff:
        jsonText += " " + str(val) + ", "
    jsonText += "0]}\n"

    outfile.write(jsonText)
outfile.close()