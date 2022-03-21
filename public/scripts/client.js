/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

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

renderTweets(data);
