$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
    
  const createTweetElement = function(tweet) {
    const $tweet = $(`<article id="old-tweet"></article>`);
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
        <span id="time">${tweet.created_at} days ago</span>
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

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets').prepend($tweet);
    }
  };
  
  $("#form_submit").click(function(event) {
    $(".error").hide();
    event.preventDefault();

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

  const loadtweets = function() {
    $.ajax("/tweets", { method: "GET"})
      .then(data => {
        renderTweets(data);
      });
  };
  loadtweets();
});