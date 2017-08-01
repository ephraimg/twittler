$(document).ready(function(){
  var $tweetBox = $('body').find(".tweetBox");
  var prevHomeLength = streams.home.length;

  var displayTweet = function(tweet) {
    var $tweet = $('<div class="tweet"></div>');
    var $user = $('<div class="tweetUser user"></div>');
    $user.text('@' + tweet.user);
    $user.appendTo($tweet);
    var $message = $('<div class="tweetBody"></div>');
    $message.text(tweet.message);
    $message.appendTo($tweet);
    var $date = $('<div class="tweetDate"></div>');
    $date.text(tweet.created_at);
    $date.appendTo($tweet);
    $tweet.prependTo($tweetBox);
  }

  // Populate page with initial tweets
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    displayTweet(tweet);
    index -= 1;
  }

  // Display all tweets on click
      // why can't I separate out this function?
  $('.refreshFeed').on('click', function () {
    for (let t = 0; t < streams.home.length; t++) {
      var tweet = streams.home[t];
      displayTweet(tweet);
      $(tweet).show();
    }
  });


  // Post new tweet on click
  $('.userTweetButton').on('click', function () {
    if (!window.users.includes("your_username")) {
      streams.users.your_username = [];
    }
    var newUserTweet = {};
    newUserTweet.user = "your_username";
    newUserTweet.message = $('.userTweetInput').val();
    newUserTweet.created_at = new Date();
    streams.users.your_username.push(newUserTweet);
    streams.home.push(newUserTweet);
    $('.userTweetInput').val('');
  });     

  // Look at one user's feed on click
  $('*').on('click', '.user', function() {
    var theUser = $(this).text().trim();
    // if (theUser[0] = '@') { 
    //   theUser = theUser.slice(1) 
    // };
    $('.tweet').hide();
    $('.tweet').filter(function() {
      return $(this).find('.user').text() === theUser;
    }).show();
   });


});



