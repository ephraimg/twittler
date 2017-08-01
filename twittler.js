$(document).ready(function(){
  var $body = $('body');
  var $tweetBox = $body.find(".tweetBox");
  //$body.html('');

  var initialHomeLength = streams.home.length;

  // Populate page with initial tweets
  var index = initialHomeLength - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($tweetBox);
    index -= 1;
  }



});