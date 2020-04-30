
$("#beginQuiz").on("click", function() {

    $("#landing-page").css("display", "none")

    var secondsLeft = 60

    var timerInterval = setInterval(function() {
        
        secondsLeft--;
        $("#quiz-timer").text("Time Left: " + secondsLeft)
    
        if(secondsLeft === 0) {
          clearInterval(timerInterval)
          alert("Out of time")
        }
    
      }, 1000);
    
})
