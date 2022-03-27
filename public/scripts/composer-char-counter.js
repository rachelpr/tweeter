// Function to track key events in the textarea
// Uses charCount to show how many characters are left in the output tag
// With help from @MGS31
$(document).ready(function () {
  $("textarea").keyup(function () {
    let $tweet = $(this).val();
    let $charCount = 140 - $tweet.length;
    let $counter = $(this).parents("form").find(".counter");

    $("output").text($charCount);

    if ($charCount < 0) {
      $($counter).addClass("counterRed");
    } else {
      $($counter).removeClass("counterRed");
    }
  });
});

