//Array to store the questions and answers for the quiz
//This is an array of objects
//Each object has 3 main keys: question, answers, and correctAnswer
//answers is another object which contains the answers
const questions = [

  {
    question: "Commonly used data types DO NOT include:",
    answers: {
      a: "Strings",
      b: "Booleans",
      c: "Alerts",
      d: "Numbers"
    },
    correctAnswer: "c"
  },

  {
    question: "The condition in an if / else statement is enclosed within ____.",
    answers: {
      a: "Quotes",
      b: "Curly brackets",
      c: "Parentheses",
      d: "Square brackets"
    },
    correctAnswer: "c"
  },

  {
    question: "Arrays in JavaScript can be used to store ____.",
    answers: {
      a: "Numbers and strings",
      b: "Other arrays",
      c: "Booleans",
      d: "All Options"
    },
    correctAnswer: "d"
  },

  {
    question: "String values must be enclosed within ____ when being assigned to variables.",
    answers: {
      a: "Commas",
      b: "Quotes",
      c: "Curly brackets",
      d: "Parentheses"
    },
    correctAnswer: "b"
  },
  
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: {
      a: "Console Logging",
      b: "JavaScript",
      c: "Terminal / bash",
      d: "For loops"
    },
    correctAnswer: "a"
  },

]

//I needed to make the timer globally accessible
var timerInterval = ""
var secondsLeft = 60

//Random starting question, which will become the first current question
var startQues = questions[getRandomInt(questions.length)]
var currQues = startQues

//Making the answerBox globally accessible, and adding listeners to it
var answerBox = document.getElementById("answer-box") 
answerBox.addEventListener("click", answerClick);


//Sets the timer and begins the quiz
$("#beginQuiz").on("click", function() {

    $("#landing-page").css("display", "none")
    $("#quiz-page").css("display", "block")
    $("#question").html(startQues.question)
    renderAns(startQues)

    timerInterval = setInterval(function() {
        
        secondsLeft--;

        $("#quiz-timer").text("Time Left: " + secondsLeft)
    
        if(secondsLeft === 0) {

          clearInterval(timerInterval)
          alert("Out of time!")
          $("#quiz-page").css("display", "none")
          $("#gameover-page").css("display", "block")
          $("#finalScore").text("You ran out of time ):")

        }
    
      }, 1000);
    
})

//End of quiz submit button which allows user to submit their score, and links to the High Scores page
$("#submitButton").on("click", function(){

  event.preventDefault()
  self.location="scores.html"

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

//This function handles what happens when an answer button is clicked
function answerClick(event) {

  //Stores the correct answer in a variable for comparison
  var corrAns = currQues.correctAnswer

  //Makes sure clicks only get processed on buttons in the list
  if (event.target.matches("button")) {
    
    event.preventDefault()
    var answerID = event.target.id

    //Displays correct text when answer is right and adds time
    if (answerID === corrAns){

      $(".correctness").css("display", "none")
      $("#right-box").css("display", "block")
      secondsLeft += 3
      questions.splice(questions.indexOf(currQues), 1)

      //The following if - else statement deals with going to the next question of game over page depending on how many questions are left
      if (questions.length !== 0) {

        currQues = questions[getRandomInt(questions.length)]
        nextQues()

      }

      else{

        $("#quiz-page").css("display", "none")
        $("#gameover-page").css("display", "block")
        $("#right-box").css("display", "block")
        $("#quiz-timer").text("Time Left: " + secondsLeft)
        clearInterval(timerInterval)
        $("#finalScore").text("Final Score: " + secondsLeft)

      }
    }

    //Similar to above, except instead will display wrong text and subtract time
    else {

      $(".correctness").css("display", "none")
      $("#wrong-box").css("display", "block")
      secondsLeft -= 5
      questions.splice(questions.indexOf(currQues), 1)

      if (questions.length !== 0) {

        currQues = questions[getRandomInt(questions.length)]
        nextQues()

      }

      else {

        $("#quiz-page").css("display", "none")
        $("#gameover-page").css("display", "block")
        $("#quiz-timer").text("Time Left: " + secondsLeft)
        clearInterval(timerInterval)
        $("#finalScore").text("Final Score: " + secondsLeft)
        $("#wrong-box").css("display", "block")

      }

    }

  }

}

//Renders the next question randomly from remaining questions, and empties answer box for next answers to be loaded
function nextQues() {

  $("#answer-box").empty()
  $("#question").html(currQues.question)
  renderAns(currQues)
}

//Debug Questions
// const questions = [

//   {
//     question: "What kiled the dinosaurs?",
//     answers: {
//       a: "Douglas Adams",
//       b: "Princess Beach",
//       c: "Arnold Schwarzenegger",
//       d: "THE ICE AGE"
//     },
//     correctAnswer: "d"
//   },

//   {
//     question: "What is Love?",
//     answers: {
//       a: "Baby don't hurt me",
//       b: "A miserable pile of secrets and lies",
//       c: "Something I don't get"
//     },
//     correctAnswer: "a"
//   },

//   {
//     question: "What is the answer to life, the universe, and everything?",
//     answers: {
//       a: "Unconditional love",
//       b: "Pokemon",
//       c: "42",
//       d: "ur mum lol"
//     },
//     correctAnswer: "c"
//   },

// ]