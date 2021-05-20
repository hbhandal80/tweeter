/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const data = [
      {
        "user": {
          "name": "Newton",
          "avatars": "https://i.imgur.com/73hZDYK.png",
          "handle": "@SirIsaac"
        },
        "content": {
          "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1621305571665
      },
      {
        "user": {
          "name": "Descartes",
          "avatars": "https://i.imgur.com/nlhLi3I.png",
          "handle": "@rd"
        },
        "content": {
          "text": "Je pense , donc je suis"
        },
        "created_at": 1621391971665
      }
    ]
});

const renderTweets = function(tweets) {
for (let tweet of tweets) {
  const $tweet = createTweetElement(tweet);
  $('.tweetsSection').prepend($tweet);
}
};

const createTweetElement = function(tweet) {
const tweetMarkup = `
  <div id="user">
    <img id="avatar">${user.avatars}</img>
    <label id="users-name">${user.name}</label>
    <label id="username">${user.handle}</label>
  </div>
  <div id="tweet">
    <label id="tweeted">${content.text}</label>
  </div>
  <div>
    <span id="time">${date}days ago</span>
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  </div>
`;
return $tweet;
}

renderTweets(data);