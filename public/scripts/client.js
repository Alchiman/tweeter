/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text:
          "If I have seen further it is by standing on the shoulders of giants",
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
  const createTweetElement = function(tweet) {
    let $tweet = `<article class="tweet">
          <header>
            <img src="${tweet.user.avatars}" alt="avatar">
            <span class="tweet-name">${tweet.user.name}</span>
            <span>${tweet.user.handle}</span>
          </header>
          <p>${tweet.content.text}</p>
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
    for (const tweet of tweets) {
      // here tweet taken from the array has turned into an article:
      const readyTweet = createTweetElement(tweet);
      // this is tweet appender:
      $("#posted-tweets").prepend(readyTweet);
    }
  };

  // here the rendertweet function is finally called
  renderTweet(data);

  $("form").on("submit", function(event) {
    event.preventDefault();
    const $Data = $(this).serialize();

    // $.post("/tweets/", $Data);

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $Data,
      success: function(results) {
        console.log("data sent");
      },
      error: function(error) {
        console.log("there was an error");
      },
    });
  });
  // =================================Ajax functions ==================

  // $("form").submit(function(event) {
  //   console.log("submit prevented");
  //   event.preventDefault();
});
