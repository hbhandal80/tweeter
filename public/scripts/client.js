/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1621305571665
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1621391971665
  //   }
  // ];

    
  const createTweetElement = function(tweet) {
    const $tweet = $(`<article id="old-tweet"></article>`);
    const user = tweet.user;
    const content = tweet.content;
    const tweetMarkup = `
      <div id="user">
        <img id="avatar" src=${user.avatars}></img>
        <label id="users-name">${user.name}</label>
        <label id="username">${user.handle}</label>
      </div>
      <div id="tweet">
        <label id="tweeted">${content.text}</label>
      </div>
      <footer>
      <div>
        <span id="time">${tweet.created_at} days ago</span>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
      <br>
      <br>
    `;
      
    $tweet.append(tweetMarkup);
    return $tweet;
  }

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweetsSection').prepend($tweet);
    }
  };
  
  $("#form_submit").click(function(event) {
   event.preventDefault();

   if (($("#tweet-text").val() === "") || ($("#tweet-text").val() === null)) {
     alert("Please enter a tweet");
   } else if (($("#tweet-text").val()).length > 140) {
     alert("You haave exceeded the maximum number of characters");
   } else {

    $.ajax({
      type: "POST",
      url: "/tweets",
      dataType: "text",
      data: $("#tweet-text").serialize(),
      success: (data) => {
        console.log("submission successful", data); 
      }
    })
  }
  })

  const loadtweets = function() {
    $.ajax("/tweets", { method: "GET"})
    .then(data => {
      renderTweets(data);
    })
  }
  loadtweets();
});

