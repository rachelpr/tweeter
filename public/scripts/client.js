/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Rendering the tweets in the tweets-container
const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    let newTweet = createTweetElement(tweet);
    $("#tweets-container").prepend(newTweet);
  }
};

// Escape function to prevent XSS on the site
// Will escape if there is a script trying to be run, and post as text instead
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Function to create the tweet element
// Includes escape method on the content.text
const createTweetElement = function (tweet) {
  const $tweet = $(`<article class="tweet"></article>`);
  let $tweetContent = $(`
  <span>
    <header>
    <img class="img-avatar" src="${tweet.user.avatars}"/>
      <a class="name">${tweet.user.name}</a>
      <a class="handle">${tweet.user.handle}</a>
    </header>
    <div class="tweet-text">
      <p>${escape(tweet.content.text)} </p>
    </div>
    <footer>
            <p>${timeago.format(tweet.created_at)} </p>
            <div class="footer-icons">
              <i class="fa-solid fa-2xs fa-flag"></i>
              <i class="fa-solid fa-2xs fa-retweet"></i>
              <i class="fa-solid fa-2xs fa-heart"></i>
            </div>
          </footer>
          </span>`);
  return $tweet.html($tweetContent);
};

// Function to load previously submitted tweets on the page
const loadTweets = function () {
  $.ajax("/tweets", {
    type: "GET",
    dataType: "JSON",
  }).then(function (tweets) {
    renderTweets(tweets);
  });
};
loadTweets();

// Various functions that are only available when the document is ready
// Will hide the error upon load
// Uses conditionals to check if tweet submission is valid
// Will load the tweet to the tweet-container if passes conditonal checks
// Error handling will show if error occurrs
$(document).ready(function () {
  $(".error").hide();
  $("#submit-tweet").on("submit", function (event) {
    let tweet = $("#submit-tweet").serialize();
    event.preventDefault();
    let tweetText = $(this).find("textarea").val();
    if (tweetText === "" || tweetText === null) {
      $(".error").text("Error: Please enter a tweet and resubmit");
      $(".error").show(1000);
    } else if (tweetText.length > 140) {
      $(".error").text(
        "Error: Please enter a tweet under 140 characters and resubmit"
      );
      $(".error").show(1000);
    } else {
      $(".error").slideUp(1000);
      $.ajax("/tweets", {
        method: "POST",
        data: tweet,
        success: function (res) {
          $("textarea").val("");
          let newTweet = createTweetElement(res);
          $("#tweets-container").prepend(newTweet);
          $(".counter").text("140");
        },
      });
    }
  });
});
