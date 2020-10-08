# Project Idea

* Team Name: Stupidly Clever

* Application Name: Stock News

## Team Overview

The team consists of [Kyle Piira](https://github.com/KylePiira), [Hannah Dacayanan](https://github.com/hdacayanan), and [Nga Huynh](https://github.com/hannah1107).

## Innovative Idea

Stock News is a social news aggregator where users can submit, comment, and vote on news stories about the stock market. They can also crowdsource summaries to news articles by submitting facts which are voted upon.

Users of the site can add holdings to their profile and easily track the performance of their stocks. Once they do so, we'll use the performance of this on site "portfolio" to give high performing users perks like having their comments appear towards the top of the page and having their votes count more. This ensures, that the users who are the most skilled (or lucky?) have the largest voice.

Overall the site is functionally similar to Reddit where instead of following subreddits, users will follow individual stocks which will each have their own news feed.

## Important Components

For the purpose of tracking stock performance in user profiles we will use the [iexcloud](https://www.iexcloud.io/) API which offers a generous free tier. Other then that we don't have any external dependencies.

We will need to use a Node JS server and database to user accounts, stories, comments, and profiles.

Stories and comments will be ranked using a time decay algorithm like: `score / age`

The URL structure of the site will be as follows:

* `/` 
  
  * If logged in: a feed of the top stories for stocks a user follows
  
  * If anonymous: a feed of the top stories across the entire site

* `/stock/{TICKER}`
  
  * A feed similar to the front page but filtered to news just about a particular ticker symbol
  
  * Here there will be controls for following a stock or adding it to your profile

* `/user/{USER}`
  
  * A user profile listing all the stocks in their public profile


