/* =======================================================================
    GLOBAL VARIABLES
======================================================================== */
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;
var gameCountDown = 10 * 3;

// setup questions

var questions = [{
    question: "The Republic of China was established, the Titanic hit an iceberg and Arizona became the 48th U.S. state.",
    choices: ["2013", "1912", "1843", "Adam & Eve"],
    correctAnswer: 1
}, {
    question: "The first commercial Concorde flight, Harold Wilson resigned from his post as Prime Minister and the Eagles released Hotel California.",
    choices: ["1954", "47 AD", "1976", "1965"],
    correctAnswer: 2
}, {
    question: "Germany invaded Denmark and Norway in operation Weserübung, Winston Churchill gave his first address as Prime Minister and Walt Disney’s Fantasia is released.",
    choices: ["1940", "1840", "1934", "2302"],
    correctAnswer: 0
}, {
    question: "An earthquake measuring 7.0 devastated Haiti, the Eurozone and the International Monetary Fund agreed a 110 billion euro bailout deal for Greece and 33 Chilean miners were rescued after being trapped underground for 69 days.",
    choices: ["2005", "2001", "2009", "2010"],
    correctAnswer: 3
}, {
    question: " David Niven and Jean Genet were born, the Union of South Africa was created and George V became King of England.",
    choices: ["1910", "1898", "1932", "1700"],
    correctAnswer: 0
}];

/* ===================================================================
    FUNCTIONS 
==================================================================== */

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer .question");
    var choiceList = $(document).find(".quizContainer .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + '<label>' + choice + '</li>').appendTo(choiceList);
    }
}
    
// reset quiz
function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();  
    
}

// Hide score during game
function hideScore() {
    $(document).find(".result").hide();
    $(document).find("#theGif").hide();
}

// display score after game
function displayScore() {
    $(document).find(".quizContainer .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer .result").show();
    $(document).find("#theGif").show();
    
}

// display countdown timer
function displayTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
            alert("You ran out of time! It's ok, give it another try.");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
            
        }

    }, 1000);
}

function timerSetup() {
    // Adding 30 sec on the clock to ansewr the questions
    gameCountDown,
    display = $('#timer');
    displayTimer(gameCountDown, display);
     
}

function imgGif() {
    $('#theGif').html('<img id="theImg" src="https://media.giphy.com/media/fdyZ3qI0GVZC0/giphy.gif" />')
}


/* =====================================================================
    MAIN PROCESS 
====================================================================== */
$(document).ready(function () {
    
    $(this).find('.startGame').hide();
    $(this).find('#timerDisplay').hide();

    // On Click hide welcome message and show timer and quesitons
    $( ".startButton" ).click(function() {
    $('.startButton').hide();
    $('#welcome').hide();
    $('.startGame').show(1000);
    $('#timerDisplay').show(1000);
  });
        // Display the first question
        displayCurrentQuestion();
        $(this).find(".quizMessage").hide();

        // Adding 30 sec on the clock to ansewr the questions
        timerSetup();

        // On clicking next, display the next question
        $(this).find(".nextButton").on("click", function () {
            if (!quizOver) {

                value = $("input[type='radio']:checked").val();

                if (value == undefined) {
                    $(document).find(".quizMessage").text("Please select an answer");
                    $(document).find(".quizMessage").show();
                } else {
                    // TODO: Remove any message 
                    $(document).find(".quizMessage").hide();

                    if (value == questions[currentQuestion].correctAnswer) {
                        correctAnswers++;
                    }

                    currentQuestion++; // Since we have already displayed the first question on DOM ready
                    if (currentQuestion < questions.length) {
                        displayCurrentQuestion();
                    } else {
                        displayScore();
                        imgGif();
                        
                        $(document).find(".nextButton").text("Play Again?");
                        quizOver = true;
                    }
                }
            }else { // quiz is over and clicked the next button (which now displays 'Play Again?'
                    quizOver = false;
                    $(document).find(".nextButton").text("Next Question");
                    resetQuiz();
                    displayCurrentQuestion();
                    hideScore();
                    
                    
            }
        });

    });