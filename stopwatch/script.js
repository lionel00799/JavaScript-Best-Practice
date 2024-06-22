window.onload = function () {
    var minutes = 0;
    var seconds = 0;
    var tens = 0;
    var appendTens = document.getElementById("tens");
    var appendSeconds = document.getElementById("seconds");
    var appendMinutes = document.getElementById("minutes");
    var buttonStart = document.getElementById("button-start");
    var buttonStop = document.getElementById("button-stop");
    var buttonReset = document.getElementById("button-reset");
    var Interval;

    buttonStart.onclick = function () {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    ;}

    buttonStop.onclick = function () {
        clearInterval(Interval);
    };

    buttonReset.onclick = function () {
        clearInterval(Interval);
        tens = "00";
        seconds = "00";
        minutes = "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
    };

    function startTimer() {
        tens++;
        if (tens <= 9) {
            if (appendTens.innerHTML !== "0" + tens) {
            appendTens.innerHTML = "0" + tens;
            }
        }
        if (tens > 9) {
            if (appendTens.innerHTML !== tens.toString()) {
            appendTens.innerHTML = tens;
            }
        }
        if (tens > 99) {
            console.log("seconds");
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }
        if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
        }
        if (seconds > 59) {
            console.log("minutes");
            minutes++;
            appendMinutes.innerHTML = "0" + minutes;
            seconds = 0;
            appendSeconds.innerHTML = "0" + 0;
        }
        if (minutes > 9) {
            appendMinutes.innerHTML = minutes;
        }
    }
}