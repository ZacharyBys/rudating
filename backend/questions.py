import random

def getQuestion():
    with open('questions.txt') as questionsfile:
        content = questionsfile.readlines()
    content = [x.strip() for x in content]
    return random.choice(content)
