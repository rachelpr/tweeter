/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Submitting a new tweet with our form
// Preventing it from loading on a new page
$("#submit-tweet").on("submit", function (event) {
  let tweet = $("#submit-tweet").serialize();
  event.preventDefault();
  $.ajax("/tweets", {
    method: "POST",
    data: tweet,
  });
  console.log(tweet);
});

// Rendering the tweets in the tweets-container
const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    let newTweet = createTweetElement(tweet);
    $("#tweets-container").append(newTweet);
  }
};

// Function to create the tweet element
const createTweetElement = function (tweet) {
  const $tweet = $(`<article class="tweet"></article>`);
  let $tweetContent = $(`
  <span>
    <header>
      <a class="name">${tweet.user.name}</a>
      <a class="handle">${tweet.user.handle}</a>
    </header>
    <div class="tweet-text">
      <p>${tweet.content.text} </p>
    </div>
    <footer>
            <p>${tweet.created_at} </p>
            <div class="footer-icons">
              <i class="fa-solid fa-2xs fa-flag"></i>
              <i class="fa-solid fa-2xs fa-retweet"></i>
              <i class="fa-solid fa-2xs fa-heart"></i>
            </div>
          </footer>
          </span>`);
  return $tweet.html($tweetContent);
};

// Function to load the tweets on the page
$(document).ready(function () {
  const loadTweets = function () {
    let tweet = $("#submit-tweet").serialize();
    $.ajax("/tweets", {
      type: "GET",
      dataType: "JSON",
    }).then(function (tweets) {
      renderTweets(tweets);
    });
  };
  loadTweets();
});
