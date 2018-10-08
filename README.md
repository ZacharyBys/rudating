# HackRU Fall 2018 Project Submission

## About the project

### Inspiration
We've used other dating apps and while they all have their ups and downs, 
there isn't one that provided consistent chatting with other users. 

We wanted to make a platform where chatting is the main appeal! We aim to revolutionize dating on Rutgers University's campus!

### What it does
Users create a profile by submitting their name, phone number and picture. 
After filling out a quick visual questionnaire, they are ready to be matched! 
Once two users are matched, they are placed in a chat room and are given 2 minutes to speed date. 
The platform provides an icebreaker topic to help start the conversation. 
After time expires, both users receive a sentiment score and can make a decision on whether they want to "match".

### How we built it
We used Python with Flask for our backend with Google Cloud Datastore for the database and Google Cloud Storage for the storage buckets. 
We used socket.io to build the chatroom, and the entire frontend was built with React and semantic-ui.

### Challenges we ran into
We had never used websockets before. The learning curve was a bit diffcult and we 

### Accomplishments that we're proud of
We're proud of the idea, the design, and the amount of features that we were able to implement in relatively short period of time.

### What we learned
None of us had used Flask or worked with websockets, so we were able to learn a lot about these two technologies during this hackathon. 
Additionally, we learned the importance of design before implementation.

### What's next for RUDating
Building it into a full scalable app with more creative matching algorithms that could help form real couples!

## How to run it
After cloning the repo:
### Frontend
```
cd rudating
npm start
```

### Backend
```
cd backend
flask run
```
