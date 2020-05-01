//Sets the timer and begins the quiz
$("#beginQuiz").on("click", function() {

    $("#landing-page").css("display", "none")
    $("#quiz-page").css("display", "block")
    $("#question").html(startQues.question)
    renderAns(startQues)

    var timerInterval = setInterval(function() {
        
        secondsLeft--;

        $("#quiz-timer").text("Time Left: " + secondsLeft)
    
        if(secondsLeft === 0) {

          clearInterval(timerInterval)
          alert("Out of time!")

        }
    
      }, 1000);
    
})

// Method for generating a random number between 0 and max
function getRandomInt(max) {

  return Math.floor(Math.random() * Math.floor(max));

}

//Renders the answers corresponding to the current question, and gives them a button
//Array is shuffled so that the answers are never in the same place
function renderAns(question) {

  var answerList = Object.keys(question.answers)
  shuffleArray(answerList)

  answerList.forEach(function(key) {

    $("#answer-box").append('<li class="answer-button"><button type="button" class="btn btn-primary" id="' + key + '">' + question.answers[key] + '</button></li>')

  })

}

//Durstenfield shuffle for an array (found on stackoverflow ofc)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function answerClick(event) {

  var corrAns = currQues.correctAnswer

  if (event.target.matches("button")) {
    
    event.preventDefault()
    var answerID = event.target.id

    if (answerID === corrAns){

      $(".correctness").css("display", "none")
      $("#right-box").css("display", "block")
      secondsLeft += 3

    }

    else {

      $(".correctness").css("display", "none")
      $("#wrong-box").css("display", "block")
      secondsLeft -= 5

    }

  }

}

//Array to store the questions and answers for the quiz
const questions = [

  {
    question: "What kiled the dinosaurs?",
    answers: {
      a: "Douglas Adams",
      b: "Princess Beach",
      c: "Arnold Schwarzenegger",
      d: "THE ICE AGE"
    },
    correctAnswer: "d"
  },

  {
    question: "What is Love?",
    answers: {
      a: "Baby don't hurt me",
      b: "A miserable pile of secrets and lies",
      c: "Something I don't get"
    },
    correctAnswer: "a"
  },

  {
    question: "What is the answer to life, the universe, and everything?",
    answers: {
      a: "Unconditional love",
      b: "Pokemon",
      c: "42",
      d: "ur mum lol"
    },
    correctAnswer: "c"
  },

]

var startQues = questions[getRandomInt(questions.length)]
var currQues = startQues
var answerBox = document.getElementById("answer-box") 
var secondsLeft = 60
answerBox.addEventListener("click", answerClick);