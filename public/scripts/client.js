$(document).ready(function() {

  //Function to allow us to prevent XSS attacks
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
    
  //Function posts tweets to the database
  const createTweetElement = function(tweet) {
    const $tweet = $(`<article id="old-tweet"></article>`);
    let dateSince = Math.floor((Date.now() - tweet.created_at) / 86400000);
    const user = tweet.user;
    const content = tweet.content;
    const tweetMarkup = `
    <article class="list"> 
    <div id="user">
        <img id="avatar" src=${user.avatars}></img>
        <label id="users-name">${user.name}</label>
        <label id="username">${user.handle}</label>
      </div>
      <div id="tweet">
        <label id="tweeted">${escape(content.text)}</label>
      </div>
      <footer>
      <div>
        <span id="time">${dateSince} days ago</span>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
      </footer>
      </article>
    `; 
    $tweet.append(tweetMarkup);
    return $tweet;
  };

  //Loop through each tweet and out put on screen with the latest shown at the top
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets').prepend($tweet);
    }
  };
  
  //On clicking the Submit button, this function will validate the data entered
  $("#form_submit").click(function(event) {
    $(".error").hide();
    event.preventDefault();
    //Error messages displayed when validating if conditions are not met
    if (($("#tweet-text").val() === "") || ($("#tweet-text").val() === null)) {
      $(".error").text("Please enter a tweet below");
      $(".error").slideDown();
    } else if (($("#tweet-text").val()).length > 140) {
      $(".error").text("You have exceeded the maximum number of characters");
      $(".error").slideDown();
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        dataType: "text",
        data: $("#tweet-text").serialize(),
        success: (data) => {
          console.log("submission successful", data);
          location.reload(true / false);
        }
      });
    }
  });

  //Function performs an Ajax call to render tweets in the database
  const loadtweets = function() {
    $.ajax("/tweets", { method: "GET"})
      .then(data => {
        renderTweets(data);
      });
  };
  loadtweets();
});