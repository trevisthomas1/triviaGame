$(window).ready(function () {

    $("#questions").hide();
    $("#results").hide();
    $("#display").hide();
    var intervalId;
    var number = 60;
    var correct = 0;
    var incorrect = 0;
    var noAnswer = 0;

    function run() {
        intervalId = setInterval(decrement, 1000);
    }

    function stop() {
        clearInterval(intervalId);
        $("#questions").hide();
        $("#display").hide();
        $("#results").show();
        displayResults();
    }

    $("#StartButton").click(function () {
        $("#startScreen").hide();
        $("#display").show();
        $("#questions").show();
        run();
        submitButton();
    });

    function decrement() {
        number--;
        $("#display").html("<h2>" + "Time Remaining: " + number + "</h2>");
        if (number <= 0) {
            stop();
        }
    }

    function restartGame(message) {
        var restart = $("<button class='btn-lg active restart'>Restart</button>").click(function () {
            location.reload();
        });
        var gameState = $("<div>").text(message);
        $("#results").append(gameState);
        $("#results").append(restart);
    }

    function submitButton() {
        var submit = $("<button class='btn-lg active'>Submit</button>").click(function () {
            stop();
        });
        $("#submit").append(submit);
    }

    function displayResults() {
        $("#submit").empty();
        var checked = false;
        for (var i = 1; i <= 8; i++) {
            var radios = document.getElementsByName('question' + i);
            for (var j = 0; j < radios.length; j++) {
                var radio = radios[j];
                if (radio.value == "correct" && radio.checked) {
                    correct++;
                    checked = true;
                    break;
                } else if (radio.value == "incorrect" && radio.checked) {
                    incorrect++;
                    checked = true;
                    break;
                } else if (!radio.checked) {
                    checked = false;
                }
            }
            if (checked === false) {
                incorrect++;
            }
        }

        if(correct >= 5) {
            var score = $("<h1>").html("Correct: " + correct + "<br>" + "Incorrect: " + incorrect + "<br>" + "That was a subpar peformance.") 
                  } else {
            var score = $("<h1>").html("Correct: " + correct + "<br>" + "Incorrect: " + incorrect + "<br>" + "You bring dishonor to your family.")
                  };
        $("#results").append(score);
        restartGame("Click to restart to take the quiz again. Or don't.")

        // var theResults = $("#results");
        // var correctScore = $("<h1>").text("Correct: " + correct);
        // var incorrectScore = $("<h1>").text("Incorrect: " + incorrect);
        // theResults.append(correctScore);
        // theResults.append(incorrectScore);
        // restartGame("Click restart to take the quiz again. Or don't.")

    }

});