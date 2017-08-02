$(document).ready(function(){
  
  // initialize variable for tracking which tweets are old/new
  var prevHomeLength = streams.home.length;

  // helper functions

  // render tweets on page
  var displayTweet = function(tweet) {
    var $tweet = $('<div class="tweet"></div>');
    $tweet.data("date", moment(tweet.created_at));
    $tweet.data("user", tweet.user);
    var $user = $('<div class="tweetUser user"></div>');
    $user.text('@' + tweet.user);
    $user.appendTo($tweet);
    var $message = $('<div class="tweetBody"></div>');
    $message.text(tweet.message);
    $message.appendTo($tweet);
    var $date = $('<div class="tweetDate"></div>');
    $date.text(moment(tweet.created_at).fromNow());
    $date.appendTo($tweet);
    var $tweetBox = $('body').find(".tweetBox");
    $tweet.prependTo($tweetBox);
  }

  // animate box-shadow on button press
  var animateButtonPress = function(jQueryBtn) {
    jQueryBtn.animate({boxShadow: '1px 1px 1px', top: '2'}, 100, function(){
    jQueryBtn.animate({boxShadow: '0 10px 6px -6px #777', top: '0'});
      });
  }

  var showNewTweets = function() {
    for (let t = prevHomeLength; t < streams.home.length; t++) {
      var tweet = streams.home[t];
      displayTweet(tweet);
    }
    prevHomeLength = streams.home.length;
  }

  var updateTimestamps = function () {
    $('.tweet').each(function(){
      let newTimestamp = $(this).data("date").fromNow()
      $(this).find('.tweetDate').text(newTimestamp);
    })
  }

  // populate page with initial tweets
  var index = 0;
  while(index <= streams.home.length - 1){
    var tweet = streams.home[index];
    displayTweet(tweet);
    index += 1;
  }


  // populate "following" list
  for (let i = 0; i < window.users.length; i++) {
    var $followedPar = $('<p class="user"></p>');
    $followedPar.text('@' + window.users[i]);
    $followedPar.appendTo($('.following'));
  }


  // "refresh" button action
  $('.refreshFeed').on('click', function () {
    animateButtonPress($(this));
    // remember the scroll position
    var old_scroll = $(window).scrollTop(); 
    showNewTweets();
    updateTimestamps();
    //restore scroll position
    $(document).scrollTop(old_scroll); 
  });


  // "post" button actions
  $('.userTweetButton').on('click', function (event) {
    animateButtonPress($(this));
    // make sure you have a stream
    if (!window.users.includes("your_username")) {
      streams.users.your_username = [];
    }
    // construct your tweet, add to stream
    var newUserTweet = {};
    newUserTweet.user = "your_username";
    newUserTweet.message = $('.userTweetInput').val();
    newUserTweet.created_at = moment();
    streams.users.your_username.push(newUserTweet);
    streams.home.push(newUserTweet);
    $('.userTweetInput').val('');
  });     


  // show a user's feed on click
  $('*').on('click', '.user', function() {
    var theUser = $(this).text().trim();
    $('.tweet').hide();
    $('.tweet').filter(function() {
      return $(this).find('.user').text() === theUser;
    }).show();
  });






});



