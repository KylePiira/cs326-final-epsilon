# Data Interactions

* Users may submit news stories into stock specific subforums consisting of:
  
  * URL to an article on the web
  
  * Title of the story (likely the same as the article title)

* Users may submit comments on news stories

* Users may vote on stories and comments to determine their ranking

* Users may add investments to their profiles and track their performance

* Users may add investments to their Watchlist to "follow" them in the news

# Wireframes

Most pages on the site follow a three-column design:

- The left column contains a list of stocks that a user is following

- The center column contains the main content for the page

- The right column contains a bar measuring the users remaining voting power and the stocks in their "portfolio".

## Homepage

The homepage contains a list of top stories about stocks in a users watchlist. If the user is not logged in then it will contain a list of top stories across all stocks.

![](../wireframes/index_wireframe.png)

## Stock

Each stock has a dedicated page founder under `/stock/{TICKER}` which is very similar to the homepage. It contains the news stories submitted by users about that stock ordered by time-decayed popularity.

The left sidebar contains a button to add the stock to the users watchlist and the right sidebar contains buttons to "buy" and "sell" the stock which will add it to either the "long" or "short" portions of their portfolio respectively.

![](../wireframes/stock_wireframe.png)

## Search Results

The search results page can be found at `/search?q={QUERY}` and contains a list of stories related to the query. The user can get to this page by typing in the search box at the top of every page.

![](../wireframes/search-results_wireframe.png)

## Story

Each news story has a dedicated page under `/story/{ID}` where users may discuss the news story via comments. This is where users can post new comments, reply to existing comments, or vote on comments.

![](../wireframes/story_wireframe.png)

## User Profile

The user profile page contains a list of submitted stories and comments by that user, along with their "portfolio". It has three tabs for "Submissions", "Comments", and "Portfolio" which can be toggled via JavaScript without reloading the page.

The information in the left and right sidebars is for the currently logged in user, not the user who's profile is being viewed (unless they are the same).

![](../wireframes/profile_submissions_wireframe.png)

![](../wireframes/profile_comments_wireframe.png)

![](../wireframes/profile_portfolio_wireframe.png)

## Submit

The article submission page contains a form that the user can use to submit news stories to the site. It takes a title, URL, and which stock to post the story into. This page is linked from the "Submit" button found in the navbar of every page.

![](../wireframes/submit_wireframe.png)

## Login

The login page allows a user to sign into their existing account and provides a link to sign up if they don't already have an account.

![](../wireframes/login_wireframe.png)

## Sign Up

The sign up page allows a user to register an account on the site using only a username and password (no email required).

![](../wireframes/sign-up_wireframe.png)

## Admin

The website will also contain a simple admin area where administrators can manage submissions and user accounts.

![](../wireframes/admin_user_wireframe.png)

![](../wireframes/admin_submission_wireframe.png)

# Bootstrap Mockups

We've implemented each of the Wireframes in Bootstrap 4 using the [Flatly theme](https://bootswatch.com/flatly/).

## Homepage

![](../screenshots/index.png)

## Stock

![](../screenshots/stock.png)

## Search Results

![](../screenshots/search-results.png)

## Story

![](../screenshots/story.png)

## User Profile

![](../screenshots/profile_submissions.png)

![](../screenshots/profile_comments.png)

![](../screenshots/profile_portfolio.PNG)

## Submit

![](../screenshots/submit.png)

## Login

![](../screenshots/login.png)

## Sign Up

![](../screenshots/sign-up.png)

## Admin

![](../screenshots/admin_user.png)

![](../screenshots/admin_submission.png)
