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
        var submit = $("<button class='btn-lg active submit'>Submit</button>").click(function () {
            stop();
        });
        $("#questions").append(submit);
    }

    function displayResults() {
        var checked = false;
        for (var i = 1; i <= 8; i++) {
            var radios = document.getElementsByName('question' + i);
            for (var j = 0; j < radios.length; j++) {
                //function to check if answer is correct
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

        var theResults = $("#results");
        var correctScore = $("<h1>").text("Correct: " + correct);
        var incorrectScore = $("<h1>").text("Incorrect: " + incorrect);
        theResults.append(correctScore);
        theResults.append(incorrectScore);
        restartGame("Click restart to try again. Or don't.")

    }

});