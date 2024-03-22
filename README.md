"How did I sleep" is a web app that connects to my Fitbit and displays my sleep data in a simple and easy to understand way.

I haven't implemented error handling for if my Fitbit didn't managed to track all the required sleep stats for the previous night, so if I didn't sleep the right way last night some values might not show up properly or might appear as "undefined."

To run everything locally, cd into packages/express-backend and run 'npm run dev'. Do the same for packages/lit-frontend. Then you should see the correct website with all the Fitbit data loaded at localhost:5173/app.

In production, my site can be found deployed at http://howdidnaomisleep.us-west-1.elasticbeanstalk.com/. Note though that the front end doesn't serve index.html, I can't seem to GET my profile_page.html, and the site won't connect to my MongoDB or Fitbit API. So it's kind of a hot mess, sorry!

Miro board link: https://miro.com/app/board/uXjVN7O8IsQ=/?share_link_id=487976104906
