//Getting the scoreList out of storage
var scoreList = JSON.parse(localStorage.getItem("scores"))

//Rendering the scores as soon as the page loads
window.onload = function() {

    //If there are no scores yet, this text is displayed
    if (!scoreList){

        $("#score-box").append("<h2>No scores yet! Go play the quiz!</h2>")
        return
    }
    
    //In order to sort the score, I need to arrange based on the score key
    //This was a solution I found on stackoverflow
    scoreList.sort(function(a, b){

        return (b.score - a.score)

    })

    //Adding the scores to the scoreboard
    scoreList.forEach(function(key){

            $("#score-box").append('<li class="score"><h2> Player ' + key.player + ': ' + key.score + '</h2></li>')

        })

    }
  
