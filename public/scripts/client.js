/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const createTweetElement = function(tweet) {
    let $tweet = `<article class="tweet">
          <header>
            <img src="${tweet.user.avatars}" alt="avatar">
            <span class="tweet-name">${tweet.user.name}</span>
            <span class="handle">${tweet.user.handle}</span>
          </header>
          <p>${escape(tweet.content.text)}</p>
          <footer>
            <span>${timeago.format(tweet.created_at)} </span>
            <span>
              <i class="fas fa-heart"></i>
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
            </span>
          </footer>
        </article>`;
    return $tweet;
  };

  // this function continusly renders tweets taken from a database
  const renderTweet = function(tweets) {
    $("#posted-tweets").empty();
    for (const tweet of tweets) {
      // here tweet taken from the array has turned into an article:
      const readyTweet = createTweetElement(tweet);
      // this is tweet appender:
      $("#posted-tweets").prepend(readyTweet);
    }
  };
  // this function loads tweets
  const loadTweets = function() {
    // here get the tweets
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: function(tweets) {
        renderTweet(tweets);
      },
      error: function(error) {},
    });
  };
  loadTweets();

  // here the rendertweet function is finally called

  $("form").on("submit", function(event) {
    const maxLength = 140;
    event.preventDefault();

    //get data from the form and prepare data for Ajax calling
    const $Data = $(this).serialize();
    const $TextArea = $(this).find("textarea");
    const $Counter = $(".counter");

    // $.post("/tweets/", $Data);

    // here post tweet to the server
    if (Number($Counter.val()) === maxLength) {
      $(".error-message")
        .text("Please type something!")
        .slideDown();
    }
    if (Number($Counter.val()) !== maxLength && $Counter.val() > 0) {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $Data,
        success: function() {
          loadTweets();
        },
        error: function(error) {
          console.log("there was an error");
          // console.log("there was an error");
        },
      });

      $TextArea.val("");
      $Counter.text(maxLength);
    }
  });
  // =================================Ajax functions ==================

  // $("form").submit(function(event) {
  //   console.log("submit prevented");
  //   event.preventDefault();
});
