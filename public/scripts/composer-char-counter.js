$(document).ready(function() {
  // --- our code goes here ---
  console.log("your JS script is linked");

  // auto adjustst the textarea
  $("textarea")
    .each(function() {
      this.setAttribute(
        "style",
        "height:" + this.scrollHeight + "px;overflow-y:hidden;"
      );
    })
    .on("input", function() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });

  // prints counter
  $("#tweet-text").on("input", function() {
    const maxLength = 140;
    let currentLength = $(this).val().length;
    let charLengthLeft = maxLength - currentLength;
    console.log(typeof maxLength);
    $(".counter").text(charLengthLeft);

    if (charLengthLeft < 0) {
      $(".counter").addClass("negetive-counter");
    } else {
      $(".counter").removeClass("negetive-counter");
    }
  });
});
