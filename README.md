# KetchIonic
Mobile app for tracking ultimate frisbee games and statistics

The App

  Ketch Ultimate is companion app for ultimate frisbee. Most ultimate games are played without a scoreboard. The ultimate community is very highly educated but players are reduced to keeping track of score in their heads, on whiteboards or even by putting rocks in upside-down frisbees. (Yes, really.) 

  Statistics and data on player performance is even more rare than scoreboards. Manually tracking data is labor-intensive. The current crop of ultimate apps are so complicated that anyone using the app has to remove themselves from the game. (Not to mention they don't track salient data.)

  Ketch solves these problems with a simple and intuitive interface. Recording a score and moving players on and off the field requires a single tap. The app does the rest of the work, recording  player performance, team performance and game metadata.
  Currently, players who want to review their game history have to dig through multiple websites only to get raw scores from the game. Not so with Ketch. Players can access results and statistics from every game they've played, for every team they've played for.

Running the App

The Ionic framework enables web applications to run natively in iOS and Android. The app can be simulated in web browser but it will require some initial legwork. 

1. Pull both KetchUltimate and KetchServer (https://github.com/tomlovett/KetchServer). KetchServer is the server, KetchUltimate encompasses the client side.
2. Open three terminal windows. Use the first to spin up MongoDB.
3. Navigate the second window to the KetchServer folder. Install the dependencies with "npm install" Then spin up the server with "nodemon"
4. Navigate the third window to KetchUltimate. Install the dependencies. Call "ionic serve" to spin up the front end. Ionic will open a new browser window and navigate it to the app. The app is designed for mobile phones so switch to Device Mode (assuming you're using Google Chrome). If you're not using Chrome just shrink the window to the size of a mobile phone.

Tutorial

  Log in and create a new account for yourself.
  
  Create a team of your friends. Most Ultimate mixed games are played with a 4/3 ratio; four men and three women on the field for every point. To get the full effect of substitutions try to create between six and eight guys and five or six women.
  
  Start a game! Record who's on the field by tapping players from the bench to field and vice versa. Record at least six points; give yourself a few, give your opponents a few. Be sure to sub players on and off the field between points. Click on the scoreboard to view a point-by-point breakdown of the game so far. When you're ready, close out the game. 
  
  The app will then take you to statistics mode. Here you'll see data from the game. You can navigate to statistics for players, teams and games by clicking on their names. 

Notes:

  Navigating backwards with the browser will break the app. (Ionic has built-in features to handle the "back button" on mobile devices but not for browsers.) You should be able to navigate wherever you like using buttons on the screen.
  
  The statistics module has very limited styling to put it generously. 

Ketch is scheduled for beta release for Apple and Android phones in Summer 2016.
