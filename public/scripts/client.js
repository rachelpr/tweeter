/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// $(function () {
//   const $button = $("#load-more-posts");
//   $button.on("click", function () {
//     console.log("Button clicked, performing ajax call...");
//     $.ajax("more-posts.html", { method: "GET" }).then(function (
//       morePostsHtml
//     ) {
//       console.log("Success: ", morePostsHtml);
//       $button.replaceWith(morePostsHtml);
//     });
//   });
// });
$(document).ready(function () {
  const createTweetElement = function () {
    const $tweet = $(`
    <header>
      <a class="name">${tweetData.user.name}</a>
      <a class="handle">${tweetData.user.handle}</a>
    </header>
    <div class="tweet-text">
      <p>${tweetData.content.text} </p>
    </div>
    <footer>
            <p>${tweetData.created_at} </p>
            <div class="footer-icons">
              <i class="fa-solid fa-2xs fa-flag"></i>
              <i class="fa-solid fa-2xs fa-retweet"></i>
              <i class="fa-solid fa-2xs fa-heart"></i>
            </div>
          </footer>`);
    return $tweet;
  };
  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
